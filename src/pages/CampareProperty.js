import React, { useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import Card from "../components/Card";
import "../App.css";
import SelectedProperties from "../components/SelectedProperties";

const CompareProperty = ({
  id,
  to,
  imgs,
  type,
  squareMeter,
  room,
  district,
  rentPrice,
  dollarRentPrice,
  condoPrice,
  favoriteState,
}) => {
  const { propertiesArray } = React.useContext(PropertyContext);
  const [selectedProperties, setSelectedProperties] = React.useState([]);
  const [compareView, setCompareView] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [show, setShow] = useState(false);

  const handlePropertySelection = (propertyId) => {
    setButtonClicked(!buttonClicked);
    setShow(!show);
    const isSelected = selectedProperties.includes(propertyId);

    if (isSelected) {
      setSelectedProperties(
        selectedProperties.filter((id) => id !== propertyId)
      );
    } else {
      if (selectedProperties.length < 3) {
        setSelectedProperties([...selectedProperties, propertyId]);
      } else {
        // Display a message or handle the case when maximum properties are already selected
      }
    }
  };

  const favoriteProperties = propertiesArray.filter(
    (card) => card.favoriteState === true
  );

  const handleBackClick = () => {
    setCompareView(false);
  };

  return (
    <div className="relative">
      <Card
        id={id}
        to={to}
        imgs={imgs}
        type={type}
        squareMeter={squareMeter}
        room={room}
        district={district}
        rentPrice={rentPrice}
        dollarRentPrice={dollarRentPrice}
        condoPrice={condoPrice}
        favoriteState={favoriteState}
      ></Card>
      <button
        type="button"
        style={{
          borderRadius: "0px 8px 0px 8px",
        }}
        className={`absolute top-0 right-0 text-white p-[8px] w-[120px] ${
          buttonClicked
            ? "bg-[#2F4858] text-white font-[700] text-[18px] z-[1]"
            : "bg-orange-200"
        } 
                  btn-select ${
                    selectedProperties.includes(id) ? "selected" : ""
                  }`}
        onClick={() => handlePropertySelection(id)}
      >
        {selectedProperties.includes(id) ? "Comparar" : "Comparando"}
      </button>
      <div className="flex justify-end mt-2">
        <button type="submit" className="btn-primary">
          Programar Visita
        </button>
      </div>
    </div>
  );
};

export default CompareProperty;
