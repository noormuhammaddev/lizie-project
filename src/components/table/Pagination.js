import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
const Pagination = ({ data, setData }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <React.Fragment>
      {currentItems.map((data, index) => {
        return (
          <div key={index} className="flex">
            <p>{data.userId}</p>z<p>{data.id}</p>
            <p>{data.title}</p>
          </div>
        );
      })}

      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Próximo"
        nextLabel="Próximo >"
        renderOnZeroPageCount={null}
        activeClassName={"active px-1 bg-[#ebd5bc] rounded text-[#2F4858]"}
        className="flex justify-center items-center gap-2 text-[#808080]"
      />
    </React.Fragment>
  );
};

export default Pagination;
