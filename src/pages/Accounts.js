import React, { useEffect, useState, useContext } from "react";
import Search from "../assets/Search.svg";
import Message from "../assets/Message.svg";
import TrashBin from "../assets/TrashBin.svg";
import { TableNew } from "../components/table/TableNew";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "firebase/firestore";
import {
  doc,
  collection,
  query,
  getDocs,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const headers = ["Display name", "Email", ""];

const Accounts = (props) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  // pagition end

  async function onDelete(item) {
    try {
      const finalId =
        currentUser.uid > item.uid
          ? currentUser.uid + item.uid
          : item.uid + currentUser.uid;
      const docRefChat = doc(db, "userChatsnew", currentUser.uid);
      const finalIdString = finalId.toString();
      await updateDoc(docRefChat, {
        [finalIdString]: deleteField(),
      });

      const docRef = doc(db, "usersnew", item.uid);
      const deleteRef = doc(db, "userChatsnew", item.uid);
      const chatRef = collection(db, "chatsnew");
      const docSnap = await getDocs(chatRef);

      docSnap.forEach(async (doc) => {
        const result = doc.id
          .replace("s6KQS7UEM8Qzg0jObXmM1TdOyP83", "")
          .trim();
        if (result === item.uid) {
          await deleteDoc(doc.ref);
        }
      });
      await deleteDoc(deleteRef);
      await deleteDoc(docRef);
      setData((prevData) =>
        prevData.filter((userData) => userData.uid !== item.uid)
      );
      toast.success("Successfully Deleted!")
    } catch (error) {
      toast.success("Error Deleting user")
    }
  }

  function NavigateToMessages(item) {
    const obj1 = item.uid;
    console.log(obj1);
    const userData = {
      uid: item.uid,
      email: item.email,
      displayName: item.displayName,
      photoURL: item.photoURL,
    };
    console.log(userData)
    navigate("/dashboard/messages", { state: { userData } });
  }

  useEffect(() => {
    const getUsers = async () => {
      const q1 = query(collection(db, "usersnew"));
      const querySnapshot1 = await getDocs(q1);
      const usersList = [];
      querySnapshot1.forEach((doc) => {
        usersList.push({ displayName: doc.displayName, ...doc.data() });
      });
      setData(usersList);
      console.log(data);
    };
    getUsers();
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const rows = currentItems
    ? currentItems
        .filter(
          (user) =>
            user.displayName.toLowerCase().includes(searchData) ||
            user.email.toLowerCase().includes(searchData)
        )

        .map((item, index) => ({
          id: index.toString(),
          informationCells: [
            {
              content: item.displayName,
            },
            {
              content: item.email,
            },
            {
              content: (
                <div className="flex gap-2 justify-end">
                  <button onClick={() => NavigateToMessages(item)}>
                    <img src={Message} alt="Message" title="Message" />
                  </button>

                  <button onClick={() => onDelete(item)}>
                    <img src={TrashBin} alt="Delete" title="Delete" />
                  </button>
                </div>
              ),
            },
          ],
          actions: [],
        }))
    : [];

  return (
    <>
    <ToastContainer/>
    <div className="account-page p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[32px] leading-[43px] text-[#121212]">
            Cuentas
          </h2>
        </div>
        <div className="border rounded px-4 md:py-[18px] py-[10px] md:w-[360px] w-[184px] flex gap-2 justify-between">
          <input
            type="text"
            placeholder="Buscar..."
            className="border-none outline-none w-full py-[0px]"
            onChange={(e) => setSearchData(e.target.value)}
          />
          <img src={Search} alt="search" className="cursor-pointer" />
        </div>
      </div>

      <div>
        <TableNew
          headers={headers}
          rows={rows}
          noDataMessage="No data to show"
          data={data}
          setData={setData}
        />
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Próximo"
          nextLabel="Próximo >"
          renderOnZeroPageCount={null}
          activeClassName={"active text-[#2F4858]"}
          className="flex justify-center items-center gap-2 text-[#808080] font-normal text-md leading-4"
          previousClassName="text-[#FF8960]"
          nextClassName="text-[#FF8960]"
          activeLinkClassName="font-bold text-2xl"
        />
      </div>
    </div>
    </>
  );
};

export default Accounts;
