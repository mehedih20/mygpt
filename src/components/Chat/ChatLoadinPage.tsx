/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCreateChatMutation } from "@/redux/features/chats/chatsApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatLoadinPage = () => {
  const router = useRouter();
  const chatId = localStorage.getItem("chatId");
  const [createChatInDB] = useCreateChatMutation();

  const createNewChat = async () => {
    const data = await createChatInDB({}).unwrap();

    const newChatId = data?.id;
    localStorage.setItem("chatId", newChatId);
    router.push(`/chat/${newChatId}`);
  };

  useEffect(() => {
    if (chatId) {
      router.push(`/chat/${chatId}`);
    } else {
      createNewChat();
    }
  }, []);

  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default ChatLoadinPage;
