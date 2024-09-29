"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ChatLoadinPage = () => {
  const router = useRouter();

  useEffect(() => {
    const chatId = localStorage.getItem("chatId");

    const createNewChat = async () => {
      const { data, error } = await supabase
        .from("chats")
        .insert([
          {
            chatName: "New Chat",
          },
        ])
        .select("id")
        .single();

      if (error) {
        console.error("Error creating chat:", error);
        return;
      }

      const newChatId = data.id;
      localStorage.setItem("chatId", newChatId);
      router.push(`/chat/${newChatId}`);
    };

    if (chatId) {
      router.push(`/chat/${chatId}`);
    } else {
      createNewChat();
    }
  }, [router]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default ChatLoadinPage;
