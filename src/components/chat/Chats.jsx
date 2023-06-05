import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Chats = ({show, handleShow}) => {
  const { currentUser } = useContext(AuthContext);
  const adminId = "5GDfNSWMRIfyVfwwbiCGtWiAvR43";
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);

  // Check if the current user is the admin user
  const isAdmin = currentUser && currentUser.uid === adminId;

  const location = useLocation();
  if (location.state) {
    const { userData } = location.state;

    function messageSelect(){
      console.log(userData)
      const userResult = {photoURL:userData.photoURL, displayName:userData.displayName, uid:userData.uid}
      dispatch({type:"CHANGE_USER", payload:userResult});
      location.state=null
    }
    messageSelect()
  } 

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChatsnew", currentUser.uid), (doc) => {
        console.log(doc.data())
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    const handleUserSelect = async () => {
      const q = query(
        collection(db, "manager"),
        where("displayName", "==", "manager")
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Manager found
          const managerData = querySnapshot.docs[0].data();
          dispatch({type:"CHANGE_USER", payload:managerData});

        } else {
          // Manager not found
          console.log("Manager not found!");
        }
      } catch (err) {
        console.log(err)
      }
    };
    if(isAdmin === false) {
      handleUserSelect();
    }
  },[])

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  
  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => {handleSelect(chat[1].userInfo); handleShow(true)}}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;