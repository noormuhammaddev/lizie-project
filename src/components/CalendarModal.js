import React, { useState } from "react";
import Modal from "./model/Model";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CalendarModal = (props) => {
  const navigate = useNavigate();
  console.log(props.userData)
  const { propertiesArray } = React.useContext(PropertyContext) 

  const selectedProperty = propertiesArray.find(
    (property) => property.id === props.selectedEvent.selectedProperty
  );

  return (
    <>
    <ToastContainer/>
      <div className="px-[24px] pb-[24px]">
        <img src="../bedroom.png" />
        <div className="flex mt-[24px] gap-[50px]">
          <div>
            <p className="text-[16px] text-[#585858] leading-[135%] pb-[8px] font-[400]">
              <h2>{props.selectedEvent.name}</h2>
              <br /> <p>{selectedProperty?.address}</p>
            </p>
            <p className="text-[14px] font-[400] text-[#585858] pb-[17px]">
              <p>{selectedProperty?.type}</p>
              <br /> Alquiler/ mes S/. 4800 (USD 1800)
              <br /> Mantenimiento S/. 500
            </p>
            <ul className="flex gap-[32px]">
              <li className="flex gap-[8px] items-center">
                <img src="../copy.svg" />
                <span>112 </span>
              </li>
              <li className="flex gap-[8px] items-center">
                <img src="../copy.svg" />
                <span>112 </span>
              </li>
              <li className="flex gap-[8px] items-center">
                <img src="../cart.png" />
                <span>112 </span>
              </li>
            </ul>
          </div>
          <div className="border-l pl-[30px]">
            <p className="text-[18px] font-[400px] pb-[5px] text-[#323232]">
              {props.userData.displayName}
            </p>
            <div className="flex gap-[10px] items-center pb-[17px]">
              <p className="text-[#808080] font-[400] text-[16px] ">
                {props.selectedEvent.phoneNumber}
              </p>
              <img onClick={async () => { await navigator.clipboard.writeText(props.selectedEvent.phoneNumber);  toast.success("Successfully saved to clipboard!")}} src="../cart.png" />

            </div>
            <p className="text-[14px] font-[14px] text-[#585858] pb-[16px]">
              2 visitas hasta ahora
            </p>
            <p className="text-[14px] font-[14px] text-[#585858]">
              Última propiedad visitada
              <br />
              #12345678
            </p>
          </div>
        </div>
        <div className="flex pt-[32px] gap-[16px] justify-end">
          <button
            className="text-[18px] font-[700] text-[#FFFFFF] px-[20px] py-[12px] bg-[#323232] rounded-[8px]"
            onClick={() => {
              props.setSlotModal(false) 
              const obj={
                userData:props.userData,
                userTime:props.userTime,
                userDate:props.userDate
              }
              axios.post(`${process.env.REACT_APP_BASE_URL}/api/cancel-visit`, obj)
            } }
          >
            Cancelar Visita
          </button>
          <button 
            className="text-[18px] font-[700] text-[#FFFFFF] px-[20px] py-[12px] bg-[#FF8960] rounded-[8px]" 
            onClick={() => {
              props.setSlotModal(false) 
              const userData = props.userData
              navigate("/dashboard/messages", { state: {userData} });
            }}
          >
            Enviar Mensaje
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
