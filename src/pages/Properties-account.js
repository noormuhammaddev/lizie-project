import React, { useEffect, useState } from "react";
import Search from "../assets/Search.svg";
import TrashBin from "../assets/TrashBin.svg";
import { TableNew } from "../components/table/TableNew";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "../components/model/Model";
import Create_Advertisment from "../components/Create_Advertisment";
import axios from "axios";

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
  "description",
  "additional",
  "Actions",
];

const Action = (properties) => {
  return console.log(properties);
};

const PropertiesAccount = (props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  // pagition end

  // modal
  const [rowData, setRowData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalOpen = (id) => {
    const data = { id };
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/delete/api/edit`, data);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/delete/api/edit`)
      .then((res) => {
        setRowData(res.data);
        setShowModal(true);
      })
      .catch();
  };
  const modalClose = () => {
    setShowModal(false);
  };

  function onDelete(props) {
    console.log("Deleted ", props);
  }

  function navigateToMessages(props) {
    navigate(`/messages/${props}`);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/property`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

        setRowData(data);
        setShowModal(true);
      })
      .catch((error) => console.error(error));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  console.log("property data: ", data);
  const rows = currentItems
    ? currentItems.map((item, index) => ({
        id: index.toString(),
        informationCells: [
          { content: item.title },
          { content: item.address },
          { content: item.property },
          { content: item.rent },
          { content: item.maintenance },
          { content: item.rooms },
          { content: item.area },
          { content: item.bathrooms },
          { content: item.parking },
          { content: item.description },
          { content: item.additional },
          {
            content: (
              <div className="flex gap-2">
                <button onClick={() => modalOpen(item._id)}>EDT</button>

                <button onClick={() => onDelete(item.id)}>
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
    <div className="account-page">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[32px] leading-[43px] text-[#121212]">
            Cuent
          </h2>
        </div>
        <div className="border rounded py-[18px] px-4 w-[360px] flex gap-2 justify-between">
          <input
            type="text"
            placeholder="Buscar..."
            className="border-none outline-none w-full"
          />
          <img src={Search} alt="" className="cursor-pointer" />
        </div>
      </div>

      <div>
        <TableNew
          headers={headers}
          rows={rows}
          noDataMessage="No Users have been invited to this practice"
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
          activeClassName={"active font-bold text-md leading-5 text-[#2F4858]"}
          className="flex justify-center items-center gap-2 text-[#808080] font-normal text-md leading-4"
          previousClassName="text-[#FF8960]"
          nextClassName="text-[#FF8960]"
        />

        <Modal shouldShowModal={showModal} dialogClassName="w-[1000px] p-[0px]">
          <div className="modal-header  relative">
            <div onClick={modalClose}>
              <img
                src="../cross.svg"
                className="absolute top-[35px] right-[40px]"
              />
            </div>
          </div>
          <div className="modal-body">
            <Create_Advertisment
              row_data={rowData}
              setRowData={setRowData}
              modalClose={modalClose}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PropertiesAccount;
