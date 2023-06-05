import React, { useState } from "react";
import Card from "./Card";
import SliderImages from "./SliderImages";
const SelectedProperties = ({
  selectedProperties,
  propertiesArray,
  onBack,
}) => {
  const [ind, setInd] = useState(0);
  const { imgs } = useState(ind);

  const handleSliderArrowClick = (increment) => {
    const newInd = ind + increment;

    if (newInd < 0) {
      setInd(selectedProperties.length - 1);
    } else if (newInd >= selectedProperties.length) {
      setInd(0);
    } else {
      setInd(newInd);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-[17px] md:ml-[60px] ml-[0px] fixed  mt-[-50px]">
        <img src="../goback.svg" onClick={onBack} className="cursor-pointer" />
        <h2 className="font-[700] text-[#121212] text-[32px]">Comparar</h2>
      </div>

      <div className="flex gap-[60px] items-center mt-[32px]">
        <div className="mt-[75px] md:pl-[50px] pl-[0px]">
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            Type
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            squareMeter
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            room
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            district
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            rentPrice
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            dollarRentPrice
          </p>
          <p className="font-[500] text-[16px] text-[#323232] mb-[16px]">
            condoPrice
          </p>
        </div>
        {selectedProperties.map((propertyId) => {
          const property = propertiesArray.find(
            (card) => card.id === propertyId
          );
          if (property) {
            return (
              <>
                <SliderImages
                  property={property}
                  ind={ind}
                  propertyId={propertyId}
                  handleSliderArrowClick={handleSliderArrowClick}
                />
              </>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SelectedProperties;
