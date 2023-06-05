import React, { useEffect, useState } from "react";
import TrashBin from "../assets/TrashBin.svg";
import { TableNew } from "../components/table/TableNew";
import Edit from "../assets/Edit.svg";
import ReactPaginate from "react-paginate";
import Modal from "../components/model/Model";
import Create_Advertisment from "../components/Create_Advertisment";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const headers = [
  "title",
  "address",
  "property",
  "rent",
  "maintenance",
  "rooms",
  "area",
  "bathrooms",
  "parking",
  "Districto",
  "",
];
const Properties = (props) => {
  console.info('REACT_APP_BASE_URL ', process.env.REACT_APP_BASE_URL)
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [rowData, setRowData] = useState(null);

  // pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  // pagition end

  // modal
  const [showModal, setShowModal] = useState(false);
  const modalClose = () => {
    setShowModal(false);
  };

  const editModal = (id) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/edit`, { id });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/edit`)
      .then((res) => {
        setRowData(res.data);
        setShowModal(true);
      })
      .catch();
  };

  function onDelete(id) {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/delete`, { id });
    toast.success("Successfully deleted!")
    setTimeout(() => {
      window.location.reload() // Show a success toast message
    }, 2000);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/property`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
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

  const newData = currentItems.filter(
    (user) =>
      user.title.toLowerCase().includes(query) ||
      user.property.toLowerCase().includes(query)
  );
  const rows = newData
    ? newData.map((item, index) => ({
        id: index.toString(),
        informationCells: [
          {
            content: item.title,
          },
          {
            content: item.address,
          },
          {
            content: item.property,
          },
          {
            content: item.rent,
          },
          {
            content: item.maintenance,
          },
          {
            content: item.rooms,
          },
          {
            content: item.area,
          },
          {
            content: item.bathrooms,
          },
          {
            content: item.parking,
          },
          {
            content: item.distrito,
          },
          {
            content: (
              <div className="flex gap-6 justify-end">
                <button onClick={() => editModal(item._id)}>
                  <img src={Edit} alt="Edit" title="Edit" />
                </button>

                <button onClick={() => onDelete(item._id)}>
                  <img src={TrashBin} alt="Delete" title="Delete" />
                </button>
              </div>
            ),
          },
        ],
        actions: [],
      }))
    : [];

  const createModal = () => {
    setRowData([]);
    setShowModal(true);
  };
  return (
    <>
      <div className="flex justify-between items-center w-[324px] pl-[20px] mt-[40px] md:hidden">
        <h2>Properties</h2>
        <div
          className="flex items-center justify-center gap-[10px] cursor-pointer"
          onClick={createModal}
        >
          <img alt="" src="../+.svg" width={"15px"} />
          <span className="text-[#FF8960] font-[700] leading-[21px] text-[18px]  ">
            create ad
          </span>
        </div>
      </div>

      <div
        className="flex w-[360px]  justify-between ml-[10px] rounded-[8px] bg-[ #FFFFFF] px-4 block mt-[16px] md:hidden "
        style={{ border: "1px solid #E6E7ED" }}
      >
        <ToastContainer />
        <input
          placeholder="search here..."
          className="outline-none py-[18px]"
          onChange={(e) => setQuery(e.target.value)}
        />
        <img alt="" src="../search.svg" className="cursor-pointer" />
      </div>
      <div className="account-page p-6">
        <div className="flex justify-between items-center hidden md:flex">
          <h2>Properties</h2>
          <div
            className="flex w-[360px] justify-between rounded-[8px] bg-[ #FFFFFF] px-4 "
            style={{ border: "1px solid #E6E7ED" }}
          >
            <ToastContainer />
            <input
              placeholder="search here..."
              className="outline-none py-[18px]"
              onChange={(e) => setQuery(e.target.value)}
            />
            <img alt="" src="../search.svg" className="cursor-pointer" />
          </div>
          <div
            className="flex items-center justify-center gap-[10px] cursor-pointer"
            onClick={createModal}
          >
            <img alt="" src="../+.svg" width={"15px"} />
            <span className="text-[#FF8960] font-[700] leading-[21px] text-[18px]  ">
              create ad
            </span>
          </div>
        </div>

        <div>
          <TableNew
            headers={headers}
            rows={rows}
            noDataMessage="No data to show"
            data={data}
            setData={setData}
            query={query}
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

        <Modal shouldShowModal={showModal} dialogClassName="w-[1000px] p-[0px]">
          <div className="modal-header relative ">
            <div onClick={modalClose}>
              <img
                alt="cross"
                src="../cross.svg"
                className="absolute top-[35px] right-[40px] cursor-pointer"
              />
            </div>
          </div>
          <div className="modal-body">
            <Create_Advertisment row_data={rowData} modalClose={modalClose} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Properties;
