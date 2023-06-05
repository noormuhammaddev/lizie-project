import React, { useState } from "react";
import HeaderLabel from "./HeaderLabel";
import TableRowContainer from "./TableRow";

const defaultNoDataMessage = "No data to show";

export function TableNew({ headers, rows, noDataMessage, query }) {
  const [modalOpen, setModalOpen] = useState("");
  if (!rows || !rows.length) {
    return <h3>{noDataMessage ? noDataMessage : defaultNoDataMessage}</h3>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[868px]">
        <section className=" flex">
          <div className="bg-[#DBD3C3] flex w-full text-[#585858] capitalize font-bold text-sm leading-4 p-4 rounded-[8px] mt-6">
            {headers.map((header, index) => (
              <HeaderLabel key={index} value={header} />
            ))}
          </div>
        </section>

        <section className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          {rows.map((row, index) => (
            <div key={index} className="border-b border-gray-100]">
              <TableRowContainer
                informationCells={row.informationCells}
                actions={row.actions}
                headers={headers ? headers : []}
                numberOfRows={rows.length}
                shouldAddBackground={index % 2 !== 0}
                icon={row.icon}
                editOnClick={() => modalOpen(row._id)}
              >
                {!!row.children ? row.children : ""}
              </TableRowContainer>
            </div>
          ))}
        </section>

        <section className="text-center pt-4"></section>
      </div>
    </div>
  );
}
