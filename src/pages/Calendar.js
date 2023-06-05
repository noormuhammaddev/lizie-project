import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { parseISO } from "date-fns";
import Modal from "../components/model/Model";
import CalendarModal from "../components/CalendarModal";
import { ToastContainer, toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const CalendarA = () => {
  const [eventData, setEventData] = useState([]);
  const [currentView, setCurrentView] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [slotModal, setSlotModal] = useState(false);
  const [userId, setUserId] = useState()
  const [userTime,setUserTime] = useState()
  const [userDate,setUserDate] = useState()

  /* Calendar Configuration Scripts */
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  let nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 31);
  nextMonth.setHours(0, 0, 0, 0);

  const handleSlotModal = (item) => {
    setSelectedEvent(item);
    setSlotModal(true);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/meeting/meetingInfo`)
      .then((res) => {
        const parsedData = res.data.map((item) => {
          setUserId(item.userData)
          setUserTime(item.time)
          setUserDate(item.date)
          const startTime = new Date(`${item.date} ${item.time}`);
          const endTime = new Date(`${item.date} ${item.time}`);
          const title = (
            <div
              className="event-title"
              // onClick={() => setSelectedEvent(item)}
              onClick={() => handleSlotModal(item)}
            >
              <strong>{`Name: ${item.name}`}</strong>
              <br />
              <span>{`Phone: (${item.phoneNumber})`}</span>
              <br/>
              <span>{`selected property ID: (${item.selectedProperty})`}</span>
            </div>
          );

          return {
            start: startTime,
            end: endTime,
            title: title,
          };
        });
        setEventData(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/meeting/slot`)
      .then((res) => {
        const slotData = res.data.map((item) => {
          if (item.Date !== undefined) {
            const title=(
              <div onClick={()=>{
                const obj={
                  itemDate:item.Date,
                  itemTime:item.Time
                }
                axios.post(`${process.env.REACT_APP_BASE_URL}/slot/time-enable`, obj)
                toast.success("Time slot successfully enabled")
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
                }}>
                Time Slot is disabled
              </div>
            )
            return {
              start: new Date(`${item.Date} ${item.Time}`),
              end: new Date(`${item.Date} ${item.Time}`),
              title: title
            };
          } else {
            const title=(
              <div onClick={()=>{
                const obj={
                  itemStart:item.start,
                  itemEnd:item.end
                }
                axios.post(`${process.env.REACT_APP_BASE_URL}//slot/date-enable`, obj)
                toast.success("Date slot successfully enabled")
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
                }}>
                Date Slot is disabled
              </div>
            )
            return {
              start: new Date(`${parseISO(item.start)} `),
              end: new Date(`${parseISO(item.end)} `),
              title: title,
            };
          }
        });
        console.log(slotData)
        setEventData((prevData) => [...prevData, ...slotData]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSelectSlot(slotInfo) {
    if (currentView === "week" || currentView === "day") {
      console.log(slotInfo);
      const abc = slotInfo.start;
      const time = new Date(abc).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      });

      console.log(time)

      const def = slotInfo.start;
      const date = new Date(def);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });

      console.log(formattedDate); 
      const obj ={Date:formattedDate,Time:time}
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/delete/meeting/slot`, obj);
      toast.success("Successfully disabled Time slot!")
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } else {
      console.log(slotInfo);
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/delete/meeting/slot`, slotInfo);
      toast.success("Successfully disabled Date slot!")
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }

    // Handle slot selection logic here
  }

  function handleViewChange(view) {
    // Handle view change logic here
    setCurrentView(view);
  }

  const eventStyleGetter = (event, start, end) => {
    const isDisabled = start < tomorrow || end >= nextMonth;
  
    if (isDisabled) {
      return {
        className: "bg-gray-500" ,
        onClick: (e) => {
          e.stopPropagation(); // Prevent the click event from propagating
          e.preventDefault(); // Prevent the default click behavior
        },
      };
    }
  
    return {};
  };
  

  return (
    <>
    <ToastContainer/>
      <Calendar
        onView={handleViewChange}
        selectable
        timeslots={1}
        step={30}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        className="h-screen p-6"
        eventPropGetter={eventStyleGetter}
      />
      {/* {selectedEvent && (
        <div className="popup">
          <h3>{selectedEvent.name}</h3>
          <p>Phone: {selectedEvent.phoneNumber}</p>
          <p>Phone: {selectedEvent.phoneNumber}</p>
          <p>Phone: {selectedEvent.phoneNumber}</p>
          <p>Phone: {selectedEvent.phoneNumber}</p>
        </div>
      )} */}

      <Modal shouldShowModal={slotModal} dialogClassName="w-[1000px] p-[0px]">
        <div className="modal-header relative flex justify-between items-center bg-[#F2EBE3] h-[85px] px-[24px] mb-[32px]">
          <h2 className="mt-[-15px]">Visita</h2>
          <div onClick={() => setSlotModal(false)}>
            <img
              alt="cross"
              src="../cross.svg"
              className="absolute  top-[30px]  right-[20px] cursor-pointer"
            />
          </div>
        </div>
        <div className="modal-body">
          <CalendarModal
            setSlotModal={setSlotModal}
            selectedEvent={selectedEvent}
            userData={userId}
            userTime={userTime}
            userDate={userDate}
          />
        </div>
      </Modal>
    </>
  );
};

export default CalendarA;
