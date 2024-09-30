"use client";
import { useGetChatsQuery } from "@/redux/features/chats/chatsApi";
import Link from "next/link";

type TChat = {
  id: number;
  created_at: string;
  chatName: string;
};

const NavLinks = () => {
  const { data: chats } = useGetChatsQuery(undefined);

  return (
    <div className="py-7">
      <ul className="my-5">
        {chats?.map((chat: TChat, index) => (
          <li key={index} className="bg-gray-700 rounded-lg mb-2">
            <Link href={`/chat/${chat.id}`}>Chat {chat.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
