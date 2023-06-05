import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import backIcon from "../../assets/BackArrow.svg"
 
const Chat = ({ handleBack,handleShowParent }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      {data.user ? (
        <div className="chatInfo">
          <span className="msg-back-icon" onClick={() => {handleBack(true); handleShowParent(false) }}> {/* Invoke the handleBack function */}
            <img src={backIcon} alt="back" />
          </span>
          <img src={data.user.photoURL} alt={data.user.displayName} />
          <span>{data.user.displayName}</span>
        </div>
      ) : null}
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
