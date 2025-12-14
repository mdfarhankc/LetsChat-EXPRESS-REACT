import { useState } from "react";
import toast from "react-hot-toast";
import useChat from "../zustand/useChat";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChat } = useChat();

  const sendMessage = async (message: string) => {
    try {
      if (!selectedChat) return;
      setLoading(true);

      const res = await fetch(`/api/chats/send/${selectedChat?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error", error);
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessages;
