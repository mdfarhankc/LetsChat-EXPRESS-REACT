import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useChat from "../zustand/useChat";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedChat} = useChat();

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!selectedChat) return;
        setLoading(true);
        setMessages([]);

        const res = await fetch(`/api/chats/${selectedChat?.id}`);
        const data = await res.json()

        if (!res.ok) throw new Error(data.error);

        setMessages(data);

      } catch (error) {
        console.error("Error", error);
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedChat, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
