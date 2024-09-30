import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import SignOutBtn from "./SignOutButton";

const UserInfo = async () => {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <UserButton />
        <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
      </div>
      <SignOutBtn />
    </div>
  );
};

export default UserInfo;
