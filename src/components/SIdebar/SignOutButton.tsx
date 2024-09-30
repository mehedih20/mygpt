"use client";
import { SignOutButton } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";

const SignOutBtn = () => {
  const signOutOptions = () => {
    localStorage.removeItem("chatId");
  };
  return (
    <SignOutButton>
      <button
        onClick={signOutOptions}
        className="py-2 bg-gray-700 px-2 mt-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ease-in-out"
      >
        <CiLogout className="text-white" />
      </button>
    </SignOutButton>
  );
};

export default SignOutBtn;
