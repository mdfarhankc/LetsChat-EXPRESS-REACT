import { useSocketContext } from "../../context/SocketContext";
import useChat from "../../zustand/useChat";

const Chat = ({ chat }: { chat: ChatType }) => {
  const { setSelectedChat, selectedChat } = useChat();

  const isSelected = selectedChat?.id === chat?.id;

  const { onlineUsers } = useSocketContext();
  
  const isOnline = onlineUsers.includes(chat.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedChat(chat)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 md:w-12 rounded-full">
            <img src={chat.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {chat.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Chat;
