"use client";
import { supabase } from "@/lib/supabaseClient";
import { model, generationConfig } from "@/lib/supbaseConfig";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [chat, setChat] = useState<TChat[]>([]);
  const [loading, setLoading] = useState(false);

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
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("messageType, text")
        .eq("chatId", parseInt(id as string))
        .order("created_at", { ascending: true });

      if (data) {
        setChat(data as TChat[]);
        console.log(data);
      }
    };
    fetchMessages();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text !== "") {
      const chatText: string = text;
      setText("");

      setChat((prev) => [...prev, { messageType: "question", text: chatText }]);
      setLoading(true);
      await supabase.from("messages").insert([
        {
          messageType: "question",
          text: chatText,
          chatId: parseInt(id as string),
        },
      ]);

      const chatSession = await model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(text);

      if (result?.response) {
        setLoading(false);
        setChat((prev) => [
          ...prev,
          { messageType: "response", text: result.response.text() },
        ]);
        await supabase.from("messages").insert([
          {
            messageType: "response",
            text: result.response.text(),
            chatId: parseInt(id as string),
          },
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen w-full lg:w-[800px] mx-auto py-5 px-4 relative">
      <div className="absolute top-5 w-full hide-scrollbar max-h-[85vh] overflow-y-scroll">
        {chat.map((msgObj, index) => {
          return (
            <div key={index} className="flex mb-5">
              {msgObj.messageType === "response" && (
                <span>
                  <LiaAtomSolid className="text-xl mr-2 mt-0.5" />
                </span>
              )}
              <p
                className={`whitespace-pre-wrap ${
                  msgObj.messageType === "question" &&
                  "bg-gray-700 px-3 py-5 rounded-lg w-1/2 ml-auto"
                }`}
              >
                {msgObj.text}
              </p>
            </div>
          );
        })}
        {loading && (
          <div className="flex mb-5">
            <span>
              <LiaAtomSolid className="text-xl mr-2 mt-0.5" />
            </span>
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        )}
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="absolute left-0 bottom-5 w-full flex gap-2 border-2 border-gray-600 rounded-full p-2"
      >
        <input
          type="text"
          placeholder="input here.."
          className="bg-transparent px-3 focus:outline-none flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={text === "" && true}
          className={`p-3 rounded-full ${
            text === "" ? "bg-gray-600" : "bg-gray-200"
          }`}
        >
          <FaArrowUp className="text-lg text-gray-800" />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
