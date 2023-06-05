import React, { useContext, useState, useEffect } from "react";
import Search from "./Search"
import Chats from "./Chats"
import { AuthContext } from "../../context/AuthContext";
import UserChat from "./UserChat";

const Sidebar = ({handleShowParent, handleBack}) => {
  const { currentUser } = useContext(AuthContext);
  const adminId = "5GDfNSWMRIfyVfwwbiCGtWiAvR43"; // replace with your admin user ID
  const [show, setShow] = useState(false);

  // Check if the current user is the admin user
  const isAdmin = currentUser && currentUser.uid === adminId;

  // Render the appropriate component based on the isAdmin flag
  const renderSearch = isAdmin ? <Search /> : <UserChat />;

  const handleShow = (value) => {
    handleShowParent(value)
    handleBack(false)
  };

  return (
    <div className="sidebar">
      {renderSearch}
      <Chats show={show} handleShow={handleShow} />
    </div>
  );
};

export default Sidebar;
