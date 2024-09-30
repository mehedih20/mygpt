/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaArrowUp, FaPen } from "react-icons/fa";
import { LiaAtomSolid } from "react-icons/lia";
import { MdCancel } from "react-icons/md";

type TProps = {
  msgObj: any;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setIsEditActive: Dispatch<SetStateAction<boolean>>;
};

const SingleChatMessage = ({
  msgObj,
  handleFormSubmit,
  text,
  setText,
  setIsEditActive,
}: TProps) => {
  const [editChat, setEditChat] = useState(false);

  const handleCancel = () => {
    setEditChat(false);
    setText("");
    setIsEditActive(false);
  };

  useEffect(() => {
    if (editChat) {
      setIsEditActive(true);
      setText(msgObj.text);
    }
  }, [editChat, msgObj.text, setText, setIsEditActive]);

  return (
    <div className="flex mb-5">
      {msgObj.messageType === "response" && (
        <span>
          <LiaAtomSolid className="text-xl mr-2 mt-0.5" />
        </span>
      )}
      <div
        className={`relative whitespace-pre-wrap group ${
          msgObj.messageType === "question" &&
          "bg-gray-700 px-3 py-6 rounded-lg w-4/5 md:w-1/2 ml-auto"
        }`}
      >
        {editChat ? (
          <form
            onSubmit={(e) => {
              handleFormSubmit(e);
              setEditChat(false);
              setIsEditActive(false);
            }}
          >
            <input
              type="text"
              className="bg-gray-700 focus:outline-none border-b mb-2 border-gray-600 rounded-lg px-3 py-2 w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-2">
              <button type="submit" className="p-2 rounded-full bg-slate-800">
                <FaArrowUp />
              </button>
              <button
                className=" text-gray-200 p-2 rounded-full bg-slate-800"
                onClick={handleCancel}
              >
                <MdCancel />
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>{msgObj.text}</p>
            {msgObj.messageType === "question" && (
              <button
                onClick={() => setEditChat(true)}
                className="absolute text-gray-400 sm:text-gray-100 sm:opacity-0 hover:text-gray-300 group-hover:opacity-100 top-0 right-0 btn-sm"
              >
                <FaPen />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleChatMessage;
