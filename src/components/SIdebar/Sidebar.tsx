import { LiaAtomSolid } from "react-icons/lia";
// import ToggleTheme from "./ToggleTheme";
import NavLinks from "./NavLinks";
import dynamic from "next/dynamic";
import { BsPencilSquare } from "react-icons/bs";

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
        <button className="flex p-2 items-center gap-1 rounded-md justify-center hover:bg-gray-700  transition-colors duration-300 ease-in-out">
          <BsPencilSquare className="text-2xl " />
        </button>
        {/* <ToggleTheme /> */}
      </div>
      <NavLinks />
      <UserInfo />
    </div>
  );
};

export default Sidebar;
