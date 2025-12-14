import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/chats");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setChats(data);
      } catch (error) {
        console.error("Error", error);
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return { loading, chats };
};

export default useGetChats;
