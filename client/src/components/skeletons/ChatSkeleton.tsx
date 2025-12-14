const ChatSkeleton = () => {
  return (
    <div className="flex gap-4 items-center p-2 w-52">
      <div className="skeleton w-8 md:w-12 h-8 md:h-12 rounded-full shrink-0"></div>
      <div className="skeleton h-6 w-full"></div>
    </div>
  );
};

export default ChatSkeleton;
