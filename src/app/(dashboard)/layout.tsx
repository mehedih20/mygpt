import Sidebar from "@/components/SIdebar/Sidebar";
import { CiMenuFries } from "react-icons/ci";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="text-2xl bg-gray-800 rounded-full drawer-button lg:hidden absolute top-5 left-4 "
        >
          <CiMenuFries />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
