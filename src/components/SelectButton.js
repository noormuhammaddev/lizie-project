import React, { useState } from 'react'

const SelectButton = ({ card ,selectedProperties,buttonClicked,handlePropertySelection}) => {
    const [click, setClick] = useState(false);
    
    
    
  return (
    <button
    type="button"
    style={{
      borderRadius: "0px 8px 0px 8px",
    }}
    className={`absolute top-0 right-0 text-white p-[8px] w-[120px] ${
      click
        ? "bg-[#2F4858] text-white font-[700] text-[18px] z-[1]"
        : "bg-orange-200"
    } 
    btn-select ${
      selectedProperties.includes(card.id) ? "selected" : ""
    }`}
    onClick={() => handlePropertySelection(card.id)}
  >
    {selectedProperties.includes(card.id)
      ? "Comparar"
      : "Comparando"}
  </button>
  )
}

export default SelectButton