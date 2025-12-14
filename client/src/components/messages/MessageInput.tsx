import { Send } from "lucide-react";
import useSendMessages from "../../hooks/useSendMessage";
import { ChangeEvent, FormEvent, useState } from "react";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessages();

  const [message, setMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 mb-3 ">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <Send className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
