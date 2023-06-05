import React, { useContext, useState } from "react";
import favoritosImg from "../../assets/Favoritos.svg";
import messageImg from "../../assets/Message.svg";
import propertyImg from "../../assets/properties.svg";
import calendarImg from "../../assets/calendar.svg";
import accountImg from "../../assets/account.svg";
import backImg from "../../assets/BackArrow.svg";
import Logout from "../chat/Logout";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const Sidebar = ({ showMenu }) => {
  const [selectedItem, setSelectedItem] = useState("");

  const { currentUser } = useContext(AuthContext);
  const adminId = "5GDfNSWMRIfyVfwwbiCGtWiAvR43"; // replace with your admin user ID

  // Check if the current user is the admin user
  const isManager = currentUser && currentUser.uid === adminId;

  return (
    <React.Fragment>
      <div className=" mx-8">
        <Link
          to="/home"
          className="font-normal text-[10px] leading-[40px] text-[#323232] flex justify-start items-center gap-2"
        >
          <img src={backImg} alt="back" color="#808080" title="back" />
          Go Back
        </Link>

        <div className="flex justify-between">
          <h2 className="font-bold text-3xl my-4 leading-[43px] text-[#323232]">
            logo
          </h2>
          <img
            src="../cross.svg"
            className="block md:hidden"
            onClick={() => showMenu(false)}
          />
        </div>

        {isManager ? (
          <ul>
            <li
              className={`pt-[34px]  ${
                selectedItem === "calendar"
                  ? "text-[#585858] font-bold"
                  : "text-[#808080] font-normal	"
              }`}
            >
              <Link
                to="calendar"
                className="flex justify-start items-center gap-2 "
                onClick={() => setSelectedItem("calendar")}
              >
                <img
                  src={calendarImg}
                  alt="calender"
                  color="#808080"
                  title="Calender"
                />
                calendar
              </Link>
            </li>

            <li
              className={`pt-[34px]  ${
                selectedItem === "properties"
                  ? "text-[#585858] font-bold"
                  : "text-[#808080] font-normal"
              }`}
            >
              <Link
                className="flex justify-start items-center gap-2 "
                to="properties"
                onClick={() => setSelectedItem("properties")}
              >
                <img
                  src={propertyImg}
                  alt="properties"
                  color="#808080"
                  title="properties"
                />
                properties
              </Link>
            </li>

            <li
              className={`pt-[34px]  ${
                selectedItem === "account"
                  ? "text-[#585858] font-bold"
                  : "text-[#808080] font-normal"
              }`}
            >
              {" "}
              <Link
                className="flex justify-start items-center gap-2 "
                to="accounts"
                onClick={() => setSelectedItem("account")}
              >
                <img
                  src={accountImg}
                  alt="account"
                  color="#808080"
                  title="account"
                />
                account
              </Link>
            </li>

            <li
              className={`pt-[34px]  ${
                selectedItem === "messages"
                  ? "text-[#585858] font-bold"
                  : "text-[#808080] font-normal"
              }`}
            >
              {" "}
              <Link
                className="flex justify-start items-center gap-2 "
                to="messages"
                onClick={() => setSelectedItem("messages")}
              >
                <img
                  src={messageImg}
                  alt="message"
                  color="#808080"
                  title="message"
                />
                messages
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="pt-[34px] text-[#808080]">
              <Link
                className="flex justify-start items-center gap-2 "
                to="favoritos"
              >
                <img
                  src={favoritosImg}
                  alt="favorite"
                  color="#808080"
                  title="favorite"
                />
                <span className="font-normal text-base leading-[135%]">
                  favorite
                </span>
              </Link>
            </li>

            <li className="pt-[34px] text-[#808080] focus:text-[red] ">
              <Link
                className="flex justify-start items-center gap-2 "
                to="messages"
              >
                <img
                  src={messageImg}
                  alt="message"
                  color="#808080"
                  title="message"
                />
                <span className="font-normal text-base leading-[135%] ">
                  message
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 mx-8 text-[#808080] mb-8 absolute bottom-0">
        <Link to="/home">
          <Logout className="gap-2" />
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Sidebar;
