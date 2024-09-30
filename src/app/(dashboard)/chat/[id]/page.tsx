"use client";
import SingleChatMessage from "@/components/Chat/SingleChatMessage";
import { supabase } from "@/lib/supabaseClient";
import { model, generationConfig } from "@/lib/supbaseConfig";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from "@/redux/features/messages/messagesApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { LiaAtomSolid } from "react-icons/lia";

type TChat = {
  text: string;
  messageType: "question" | "response";
};

const ChatPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [text, setText] = useState("");
  const [isEditActive, setIsEditActive] = useState(false);
  const [chat, setChat] = useState<TChat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { data: messagesData } = useGetMessagesQuery(id as string);
  const [createMessage] = useCreateMessageMutation();

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTop = scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const checkId = async () => {
      const { data } = await supabase.from("chats").select("id");
      const findId = data?.find((c) => c.id === parseInt(id as string));
      if (findId) {
        localStorage.setItem("chatId", id as string);
      } else {
        console.log(findId);
        router.push("/chat");
      }
    };
    checkId();
  }, [id, router]);

  useEffect(() => {
    if (messagesData) {
      setChat(messagesData);
    }
  }, [messagesData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text !== "") {
      const chatText: string = text;
      setText("");
      setIsLoading(true);

      setChat((prev) => [...prev, { messageType: "question", text: chatText }]);
      await createMessage({
        messageType: "question",
        text: chatText,
        chatId: id as string,
      });

      const chatSession = await model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(text);

      if (result?.response) {
        setChat((prev) => [
          ...prev,
          { messageType: "response", text: result.response.text() },
        ]);

        await createMessage({
          messageType: "response",
          text: result.response.text(),
          chatId: id as string,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-svh w-full lg:w-[800px] mx-auto pt-5 pb-2 md:pb-5 relative">
      <div
        ref={scrollContainerRef}
        className="absolute top-5 w-full px-2 hide-scrollbar max-h-[85vh] overflow-y-scroll"
      >
        {chat.map((msgObj, index) => (
          <SingleChatMessage
            msgObj={msgObj}
            key={index}
            handleFormSubmit={handleFormSubmit}
            setText={setText}
            text={text}
            setIsEditActive={setIsEditActive}
          />
        ))}
        {isLoading && (
          <div className="flex mb-5">
            <span>
              <LiaAtomSolid className="text-xl mr-2 mt-0.5" />
            </span>
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        )}
      </div>
      <div className="absolute bottom-2 md:bottom-5 w-full px-2">
        <form
          onSubmit={handleFormSubmit}
          className=" flex gap-2 border-2 border-gray-600 rounded-full p-1 md:p-2"
        >
          <input
            type="text"
            placeholder="input here.."
            className="bg-transparent px-3 focus:outline-none flex-1"
            value={isEditActive ? "" : text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={text === ""}
            className={`p-3 rounded-full ${
              text === "" ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <FaArrowUp className="text-lg text-gray-800" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
