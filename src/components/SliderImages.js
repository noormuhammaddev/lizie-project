import React, { useState } from 'react'
import Modal from './model/Model';
import ClientCalendar from './ClientCalendar';

const SliderImages = ({ property, propertyId }) => {
  const [ind, setInd] = useState(0);
  const [openModal, setModal] = useState(false);

    const handleSliderArrowClick = (increment) => {
      const newInd = ind + increment;
  
      if (newInd < 0) {
        setInd(property.imgs.length - 1);
      } else if (newInd >= property.imgs.length) {
        setInd(0);
      } else {
        setInd(newInd);
      }
    };
  return (
      <>
           <div key={propertyId} className="relative flex  ">
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative">
                    <img
                      key={""}
                      src={property.imgs[ind]}
                      alt={`Property`}
                      className="max-w-full h-auto mb-2 rounded-[8px] "
                      style={{ width: "261px", height: "168px" }}
                    />
                    <img
                      src="../nest.svg"
                      onClick={() => handleSliderArrowClick(1)}
                      className="absolute top-[40%] mr-[20px] right-0 cursor-pointer"
                    />
                  </div>
                  <div className="w-full text-center">
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.type}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.squareMeter}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.room}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.district}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px] bg-[#EAEDEE] py-[8px]">
                      {property.rentPrice}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.dollarRentPrice}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.condoPrice}
                    </div>
                    <div className="mb-4 text-[#2F4858] fon-[400] text-[14px]">
                      {property.favoriteState}
                      </div>
                      <button className='mt-[50px] mb-[20px] w-[175px] h-[45px] bg-[#FF8960] rounded-[8px] font-[700] text-[#FFFFFF] text-[18px]' onClick={()=>setModal(true)}>Programar visita</button>
                  </div>
        </div>
        <Modal shouldShowModal={openModal} dialogClassName="w-[1000px] p-0">
          <div className="modal-header relative ">
            <div onClick={()=>setModal(false)}>
              <img
                alt="cross"
                src="../cross.svg"
                className="absolute top-0 right-0  cursor-pointer"
              />
            </div>
          </div>
          <div className="modal-body">
            <ClientCalendar />
          </div>
        </Modal>
         </div>
    </>
  )
}

export default SliderImages