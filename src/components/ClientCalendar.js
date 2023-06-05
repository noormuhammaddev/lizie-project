import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { parseISO, isSameDay } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "./model/Model";
import VasitaAgenda from "./VasitaAgenda";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";
import { useTranslation } from "react-i18next";


const ClientCalendar = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* Adding client functionality  */
  const { currentUser } = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);

  const adminId = "5GDfNSWMRIfyVfwwbiCGtWiAvR43"; // replace with your admin user ID

  // Check if the current user is the admin user
  const isManager = currentUser && currentUser.uid === adminId;

  useEffect(() => {
    if (
      currentUser === "undefined" ||
      currentUser === null ||
      Object.keys(currentUser).length === 0
    ) {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [currentUser]);

  /* Calendar Configuration Scripts */
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  let nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 31);
  nextMonth.setHours(0, 0, 0, 0);

  /* Appointment Scheduling Form Scripts */
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [availSlot, setAvailSlot] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/slot`)
      .then((res) => setSelectedSlot(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/meetingInfo`)
      .then((res) => parseEventData(res.data));
  }, []);

  function parseEventData(eData) {
    setAvailSlot(eData);
  }

  const isSlotDisabled = (date) => {
    const selArray = selectedSlot.map((item) => {
      return item.start;
    });
    return selArray.some((selectedslot) =>
      isSameDay(parseISO(selectedslot), date)
    );
  };

  const times = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isUser){
      const slotTrue = availSlot.some((item) => {
        return item.time === selectedTime && item.date === selectedDate;
      });
      if (slotTrue) {
        toast.success("Time Slot already Booked");
      } else {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        const data = {
          date: selectedDate,
          time: selectedTime,
          name: name,
          phoneNumber: phone,
          selectedProperty: props.selectedPropertyId,
          userData: userData
        };
        console.log(data);
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/meetings`, data).then((res) => {
          console.log(res.data);
          setModal(true);
        });
      }
    }
    else{
      toast.success("Kindly login, redirecting to login page");
      setTimeout(() => {
        navigate("/login")
      }, 2000);
      
    }
    
  };

  function timeDisabled(time) {
    return (
      selectedSlot.some((item) => {
        return item.Date === selectedDate && item.Time === time;
      }) ||
      availSlot.some((item) => {
        return item.time === time && item.date === selectedDate;
      })
    );
  }

  return (
    <>
      <ToastContainer />
      {!isManager?(<div className="max-w-sm">
        <form onSubmit={handleSubmit} className="mb-12">
          <h3 className="mb-6 md:text-[20px] text-[16px]">{t('schedule_visit')}</h3>

          <p className="text-black3 font-medium mb-2">{t('schedule_day')}</p>

          <Calendar
            className="roboto !w-full !border-0 rounded-lg overflow-hidden bg-white1 drop-shadow-md mb-6"
            tileDisabled={({ date }) =>
              date < tomorrow || date >= nextMonth || isSlotDisabled(date)
            }
            onChange={(date) => setSelectedDate(date.toLocaleDateString())}
          />

          <p className="text-black3 font-medium mb-2">{t('schedule_time')}</p>
          <div className="grid grid-cols-6 gap-2 mb-6 sm:grid-cols-7">
            {times.map((time) => (
              <label key={time} className="w-fit">
                <input
                  type="radio"
                  className="hidden"
                  name="time"
                  disabled={timeDisabled(time)}
                  value={time}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
                <div
                  className={`form-radio ${
                    timeDisabled(time)
                      ? "bg-gray-200 opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <p>{time}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              required
              className="form-input"
              placeholder={t('form_name')}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key) &&
                event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
              required
              className="form-input"
              placeholder={t('form_phnumber')}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              {t("schedule_button")}
            </button>
          </div>
        </form>
        <Modal shouldShowModal={openModal} dialogClassName="w-[1000px] p-0">
          <div className="modal-header relative ">
            <div onClick={() => setModal(false)}>
              <img
                alt="cross"
                src="../cross.svg"
                className="absolute  top-0 right-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="modal-body">
            <VasitaAgenda openModal={openModal} setModal={setModal} />
          </div>
        </Modal>
      </div>):(console.log("Manager cant see calendar"))}
    </>
  );
};

export default ClientCalendar;
