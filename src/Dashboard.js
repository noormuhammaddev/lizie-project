import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);
  return (
    <React.Fragment>
      <div className="md:hidden block bg-[#F2EBE3] h-[75px]">
        <div className="flex justify-between items-center py-[16px] px-[24px]">
          <div className="text-[#323232] font-[700] text-[32px]">logo</div>
          <div className="">
            <img
              src="../himbarger.svg"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </div>
      <div className="flex h-full overflow-hidden md :overflow-x-auto overflow-x-scroll md:overflow-auto">
        <div
          className={`bg-[#DBD3C3] text-white  flex-shrink-0 w-[200px] h-full relative responsive-sidebar ${
            showMenu ? "show-sidebar" : ""
            }`}
          style={{zIndex:'9'}}
        >
          <Sidebar showMenu={setShowMenu} />
        </div>

        <div
          className="flex-1 h-full h-[100%] md:overflow-x-hidden"
          style={{ overflowY: "auto" }}
        >
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
