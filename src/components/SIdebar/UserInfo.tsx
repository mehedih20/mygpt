import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const UserInfo = async () => {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex items-center gap-2">
      <UserButton />
      <p className="font-medium">{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default UserInfo;
