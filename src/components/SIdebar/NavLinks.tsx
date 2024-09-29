/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

type TChat = {
  id: number;
  created_at: any;
  chatName: string;
};

const NavLinks = () => {
  const [chats, setChats] = useState<TChat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase.from("chats").select("*");
      if (error) {
        console.error("Error fetching chats:", error);
      } else {
        setChats(data);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="py-7">
      <ul className="my-5">
        {chats.map((chat, index) => (
          <li key={index} className="bg-gray-700 rounded-lg mb-2">
            <Link href={`/chat/${chat.id}`}>Chat {chat.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
