import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import useChat from "../../zustand/useChat";
import useGetChats from "../../hooks/useGetChats";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedChat } = useChat();
  const { chats } = useGetChats();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be atleast 3 characters!");
    }

    const seachedChat = chats.find((c: ChatType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    console.log(seachedChat);

    if (seachedChat) {
      setSelectedChat(seachedChat);
      setSearch("");
    } else {
      toast.error("No User Found!");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  "
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
