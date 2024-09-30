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
        className="py-1.5 bg-gray-700 w-full mx-auto px-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 font-medium"
      >
        <CiLogout className="text-white" />
        Sign Out
      </button>
    </SignOutButton>
  );
};

export default SignOutBtn;
