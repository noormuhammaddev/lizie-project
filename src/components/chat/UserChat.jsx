import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const UserChat = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleSearch = async () => {
      const q = query(
        collection(db, "manager"),
        where("displayName", "==", "manager")
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Manager found
          const managerData = querySnapshot.docs[0].data();
          setUser(managerData);
        } else {
          // Manager not found
          alert("Manager not found!");
        }
      } catch (err) {
        setErr(true);
      }
    };

    const handleSelect = async () => {
      if (user) {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, "chatsnew", combinedId));

          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chatsnew", combinedId), { messages: [] });

            //create user chats
            await updateDoc(doc(db, "userChatsnew", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChatsnew", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {}
      }
    };

    handleSearch().then(handleSelect);
  }, []);
};

export default UserChat;

