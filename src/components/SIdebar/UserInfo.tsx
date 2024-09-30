import { UserButton } from "@clerk/nextjs";
import SignOutBtn from "./SignOutButton";

const UserInfo = async () => {
  return (
    <div className="flex items-center gap-4">
      <UserButton />
      <SignOutBtn />
    </div>
  );
};

export default UserInfo;
