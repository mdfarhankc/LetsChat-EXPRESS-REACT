import { Request, Response } from "express";
import prisma from "../db/prisma";
import { getReceiverSocketId, io } from "../socket/socket";

const SendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let chat = await prisma.chat.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        chatId: chat.id,
      },
    });

    if (newMessage) {
      chat = await prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ ...newMessage });
  } catch (error: any) {
    console.error("Error in SendMessage controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error!" });
  }
};

const GetMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const chats = await prisma.chat.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chats) {
      return res.status(200).json([]);
    }

    res.status(200).json(chats.messages);
  } catch (error: any) {
    console.error("Error in GetMessages controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error!" });
  }
};

const GetChats = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id;
    // get all users except loggedin user
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error in GetChats controller", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error!" });
  }
};

export { SendMessage, GetMessages, GetChats };
