import { LiaAtomSolid } from "react-icons/lia";
import NavLinks from "./NavLinks";
import dynamic from "next/dynamic";
import SidebarNewChat from "./SidebarNewChat";

const Sidebar = async () => {
  const UserInfo = dynamic(() => import("./UserInfo"), {
    ssr: false,
  });

  return (
    <div className="menu bg-base-200 text-base-content min-h-full w-80 py-10 px-8 grid grid-rows-[auto,1fr,auto]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <LiaAtomSolid className="text-4xl mr-1" />
          <h2 className="text-2xl font-bold">MyGPT</h2>
        </div>
        <SidebarNewChat />
      </div>
      <NavLinks />
      <UserInfo />
    </div>
  );
};

export default Sidebar;
