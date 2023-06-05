import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import Logout from "./chat/Logout";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import dashImg from "../assets/dashboards.svg";
import { useTranslation } from "react-i18next";

const MyDropdown = () => {
  const {t} = useTranslation();
  const { currentUser } = useContext(AuthContext);
  return (
    <Menu>
      <Menu.Button className="block mt-0   md:inline-block md:mt-0 md:ml-2 ml-0">
        {currentUser && currentUser.photoURL && (
          <div
            className="flex items-center gap-[5px] absolute md:relative top-[2%] right-[22%]
}"
          >
            {" "}
            <img className="w-[30px]" src={currentUser.photoURL} alt="" />
            <img src="../selec.svg" width={"10px"} alt="select" />
          </div>
        )}
      </Menu.Button>
      <Menu.Items className="origin-top-right absolute md:right-[1%] right-[5%] py-[14px] px-[10px] md:mt-[130px] mt-[-18px] w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/dashboard"
              className="text-m font-semibold flex gap-[14px] mb-[12px]"
            >
              <img src={dashImg} alt="" className="w-[20px]" />
              {t('go_to_dash')}
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>{({ active }) => <Logout />}</Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default MyDropdown;
