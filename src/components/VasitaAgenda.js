import React from "react";

const VasitaAgenda = ({openModal,setModal}) => {
  return (
    <>
      <div className="md:w-[500px] w-[300px]  md:h-[440px] h-[100%] flex flex-col justify-center items-center gap-[24px] p-[32px]">
        <img src="../tick.svg" alt="" />
        <h2 className="font-[500] text-[24px] text-[#323232]">
          Visita agendada con éxito
        </h2>
        <p className="font-[400] text-[18px] text-[#323232]">
          Muchas gracias por reservar con nosotros.
        </p>
        <p className="font-[400] text-[18px] text-[#323232]">
          Nos estaremos contactando contigo a través de tu <br />
          número telefónico o via whatsapp a la brevedad para
          <br /> confirmar la cita y ultimar detalles.{" "}
        </p>

        <p className="font-[400] text-[18px] text-[#323232]">Gracias!</p>
        <button  className="font-[700] rounded-[8px] text-[#FFFFFF] text-[18px] w-[120px] bg-[#FF8960] py-[12px]" onClick={()=>{setModal(false); window.location.reload()}}>
          Continuar
        </button>
      </div>
    </>
  );
};

export default VasitaAgenda;
