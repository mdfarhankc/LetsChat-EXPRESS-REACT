import { create } from "zustand";

interface ChatState {
    selectedChat: ChatType | null;
    messages: MessageType[];
    setSelectedChat: (chat: ChatType | null) => void;
    setMessages: (messages: MessageType[]) => void;
}

const useChat = create<ChatState>((set) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({selectedChat: chat}),
    messages: [],
    setMessages: (messages) => set({messages}),
}));

export default useChat;