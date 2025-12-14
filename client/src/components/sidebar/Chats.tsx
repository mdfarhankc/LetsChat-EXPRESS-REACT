import useGetChats from "../../hooks/useGetChats";
import ChatSkeleton from "../skeletons/ChatSkeleton";
import Chat from "./Chat";

const Chats = () => {
  const { chats, loading } = useGetChats();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      ) : (
        chats.map((conversation) => (
          <Chat key={conversation.id} chat={conversation} />
        ))
      )}
    </div>
  );
};
export default Chats;
