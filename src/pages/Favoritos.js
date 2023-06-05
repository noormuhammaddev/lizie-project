import React, { useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import Card from "../components/Card";
import "../App.css";
import SelectedProperties from "../components/SelectedProperties";
import CompareProperty from "./CampareProperty";
import SelectButton from "../components/SelectButton";
import Modal from "../components/model/Model";
import ClientCalendar from "../components/ClientCalendar";

const Favoritos = () => {
  const { propertiesArray } = React.useContext(PropertyContext);
  const [selectedProperties, setSelectedProperties] = React.useState([]);
  const [compareView, setCompareView] = React.useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setModal] = useState(false);

  // const handlePropertySelection = (propertyId) => {
  //   setButtonClicked(!buttonClicked);
  //   setShow(!show);
  //   const isSelected = selectedProperties.includes(propertyId);

  //   if (isSelected) {
  //     setSelectedProperties(
  //       selectedProperties.filter((id) => id !== propertyId)
  //     );
  //   } else {
  //     if (selectedProperties.length < 3) {
  //       setSelectedProperties([...selectedProperties, propertyId]);
  //     } else {
  //       // Display a message or handle the case when maximum properties are already selected
  //     }
  //   }
  // };
  const handlePropertySelection = (propertyId) => {
    setButtonClicked(propertyId); // Update the clicked button ID

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

  const handleCompareClick = () => {
    setCompareView(true);
  };

  const handleCancelClick = () => {
    setSelectedProperties([]);
    setCompareView(false);
  };

  const handleBackClick = () => {
    setCompareView(false);
  };

  console.log("selectedProperties", selectedProperties.length);

  return (
    <div className="h-full px-4 py-10 w-[100%]">
      {!compareView ? (
        <>
          <h2 className="pb-[32px] ">Favoritos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[32px]">
            {favoriteProperties.map((card, index) => (
              <div key={index} className="relative">
                <Card
                  id={card.id}
                  to={card.to}
                  imgs={card.imgs}
                  type={card.type}
                  squareMeter={card.squareMeter}
                  room={card.room}
                  district={card.district}
                  rentPrice={card.rentPrice}
                  dollarRentPrice={card.dollarRentPrice}
                  condoPrice={card.condoPrice}
                  favoriteState={card.favoriteState}
                ></Card>
              
                <button
                  type="button"
                  style={{
                    borderRadius: "0px 8px 0px 8px",
                  }}
                  className={`absolute  top-0 right-0 text-white p-[8px] w-[120px] ${
                    selectedProperties.includes(card.id) // Compare the button ID with clicked button ID
                      ? "bg-[#2F4858] text-white font-[700] text-[18px] z-[1]"
                      : "bg-orange-200"
                  } 
  btn-select ${selectedProperties.includes(card.id) ? "selected" : ""}`}
                  onClick={() => handlePropertySelection(card.id)}
                >
                  {selectedProperties.includes(card.id)
                    ? "Comparar"
                    : "Comparando"}
                </button>

                <div className="flex justify-end mt-2">
                  <button type="submit" className="btn-primary" onClick={()=>setModal(true)}>
                    Programar Visita
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedProperties.length > 0 && (
            <div
              style={{ zIndex: "1" }}
              className={`noor sticky h-[144px] absolute bottom-0 left-0 top-0 px-[64px] ml-[-15px] mr-[-20px]  top-0 flex justify-between items-center ${
                buttonClicked ? "bg-[#EAEDEE]" : "bg-[#EAEDEE]"
              } `}
            >
              <div className="flex flex-1">
                {selectedProperties.map((propertyId) => {
                  const property = propertiesArray.find(
                    (card) => card.id === propertyId
                  );
                  if (property) {
                    return (
                      <div key={propertyId} className="mr-2 relative ">
                        <img
                          src={property.imgs[0]} // Use the first image for the thumbnail
                          alt={`Property ${propertyId}`}
                          className="w-[80px] h-[80px] h-10 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 p-1 w-[25px] h-[25px] bg-red-500 rounded-[50%] text-white text-xs"
                          onClick={() => handlePropertySelection(propertyId)}
                        >
                          X
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {selectedProperties.length > 0 && (
                <>
                  <button
                    type="button"
                    className=" mr-2"
                    onClick={handleCancelClick}
                  >
                    <span className="text-[#585858] p-[12px] text-[18px]">
                      X
                    </span>
                    <span className="text-[#585858] text-[18px] font-[700]">
                      Limpiar todo
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn-primary ml-[32px]"
                    onClick={handleCompareClick}
                  >
                    Comparar propiedades
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <SelectedProperties
          selectedProperties={selectedProperties}
          propertiesArray={propertiesArray}
          onBack={handleBackClick}
        />
      )}
      <Modal shouldShowModal={openModal} dialogClassName="w-[1000px] p-0">
          <div className="modal-header relative ">
            <div onClick={()=>setModal(false)}>
              <img
                alt="cross"
                src="../cross.svg"
                className="absolute  top-0 right-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="modal-body">
            <ClientCalendar />
          </div>
        </Modal>
    </div>
  );

};

export default Favoritos;
