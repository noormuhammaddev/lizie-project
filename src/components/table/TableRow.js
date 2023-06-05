import React from "react";

import HeaderLabel from "./HeaderLabel";

function CellContainer(cell) {
  return (
    <label
      className="flex-1 text-sm font-medium text-[#111827] "
      title={cell.content}
    >
      {cell.content}
    </label>
  );
}

const TableRowContainer = ({
  informationCells,
  actions,
  headers,
  children,
  editOnClick,
}) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <div>
        <div className="flex items-center   px-4 py-[18px] w-full">
          <div className="hidden">
            {headers.map((header) => (
              <HeaderLabel key={header} value={header} />
            ))}
          </div>

          {informationCells.map((cell, index) => (
            <div
              className=" text-[#585858] font-normal text-sm w-[120px] pl-1.5 leading-4 truncate"
              key={index}
            >
              {cell.content}
            </div>
          ))}
        </div>
      </div>

      {children}
    </React.Fragment>
  );
};
export default TableRowContainer;
