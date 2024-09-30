"use client";
import { useCreateChatMutation } from "@/redux/features/chats/chatsApi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";

const SidebarNewChat = () => {
  const [createChatInDB] = useCreateChatMutation();
  const router = useRouter();
  const { user } = useUser();

  const createNewChat = async () => {
    const data = await createChatInDB(
      user?.primaryEmailAddress?.emailAddress as string
    ).unwrap();

    const newChatId = data?.id;
    localStorage.setItem("chatId", newChatId);
    router.push(`/chat/${newChatId}`);
  };
  return (
    <button
      onClick={createNewChat}
      className="flex p-2 items-center gap-1 rounded-md justify-center hover:bg-gray-700  transition-colors duration-300 ease-in-out"
    >
      <BsPencilSquare className="text-2xl " />
    </button>
  );
};

export default SidebarNewChat;
