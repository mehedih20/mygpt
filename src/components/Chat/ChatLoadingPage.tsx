/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCreateChatMutation } from "@/redux/features/chats/chatsApi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const ChatLoadinPage = () => {
  const router = useRouter();
  const [createChatInDB] = useCreateChatMutation();
  const hasInitialized = useRef(false);
  const { user, isLoaded } = useUser();

  const createNewChat = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const data = await createChatInDB(
      user?.primaryEmailAddress?.emailAddress as string
    ).unwrap();

    const newChatId = data?.id;
    localStorage.setItem("chatId", newChatId);
    router.push(`/chat/${newChatId}`);
  };

  useLayoutEffect(() => {
    // Ensure this runs only once and when the user is loaded
    if (!hasInitialized.current && isLoaded) {
      hasInitialized.current = true;

      const chatId = localStorage.getItem("chatId");
      if (chatId) {
        router.push(`/chat/${chatId}`);
      } else {
        createNewChat();
      }
    }
  }, [isLoaded]);

  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default ChatLoadinPage;
