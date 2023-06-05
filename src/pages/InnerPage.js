import "../App.css";
import Navbar from "../components/Navbar";
import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import squareMeterIcon from "../assets/icon/square-meter.svg";
import roomIcon from "../assets/icon/room.svg";
import bathroomIcon from "../assets/icon/bathroom.svg";
import parkingIcon from "../assets/icon/parking.svg";
import petsIcon from "../assets/icon/pets.svg";
import gardenIcon from "../assets/icon/garden.svg";
import patioIcon from "../assets/icon/patio.svg";
import poolIcon from "../assets/icon/pool.svg";
import commonAreasIcon from "../assets/icon/common-areas.svg";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Slider from "react-slick";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import ContactForm from "../components/ContactForm";
import { PropertyContext } from "../context/PropertyContext";
import "react-calendar/dist/Calendar.css";
import FavoriteBtn from "../components/FavoriteBtn";
import MapComponent from "../components/Map";
import { ToastContainer, toast } from "react-toastify";
import ClientCalendar from "../components/ClientCalendar";
import { useTranslation } from "react-i18next";

const InnerPage = () => {
  const { t } = useTranslation();
  /* Script to Retrieve Information from an Array */
  const { propertiesArray } = React.useContext(PropertyContext);
  let { selectedPropertyId } = useParams();

  /* Script that Searches the Array for the Selected ID and Stores its Location. */
  const selectedProperty = propertiesArray.find(
    (property) => property.id === selectedPropertyId
  );

  /* Script to Show/Hide the Map */
  const [showMap, setShowMap] = useState(false);

  /* Script for the Slider */
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && slider.innerSlider) {
      const { currentSlide, slideCount, slidesToShow } =
        slider.innerSlider.state;
      setIsBeginning(currentSlide === 0);
      setIsEnd(currentSlide === slideCount - slidesToShow);
    }
  }, []);

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      const imgsLength = selectedProperty?.imgs?.length || 0;
      setIsBeginning(next === 0);
      setIsEnd(next === imgsLength - settings.slidesToShow);
    },
  };

  /* Script to Detect when it is Mobile */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const addressesArray = propertiesArray.map((card) => card.address);
  const address = selectedProperty?.address;
  const addressesArray = address ? [address] : [];

  /* Contact Form Scripts */
  const contactFields = {
    buttonText: t("contact_form1_btn"),
    showMessageField: true,
  };

  /* Share Scripts */
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch (error) {
        console.error("Algo salió mal al compartir el enlace", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado al portapapeles.");
    }
  };

  const handleSubmit = (event) => {};

  return (
    <>
      <ToastContainer />
      <div className="bg-bg">
        <Navbar showSearchField={false} />
      </div>

      <div className="container px-6 py-10 mx-auto">
        <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <h1 className="mb-8">{selectedProperty?.title}</h1>

            <span className="text-black4 mb-2">{t("filter_title")}</span>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-end gap-1">
                <p className="text-black3 subtitle">S/.</p>
                <h2 className="roboto">{selectedProperty?.rentPrice}</h2>
              </div>

              <span className="text-black4">
                ( <b>$</b> {selectedProperty?.dollarRentPrice})
              </span>
            </div>
            <span className="text-black4 block mb-8">
              {t("maintenance")} S/. {selectedProperty?.condoPrice}
            </span>

            <p className="title text-black2 mb-2">
              {selectedProperty?.district}
            </p>
            <span className="text-black4 block mb-8">
              {selectedProperty?.type}
            </span>

            <div className="grid grid-cols-5 justify-between gap-x-4 gap-y-8 mb-8">
              <div>
                <img
                  src={squareMeterIcon}
                  alt="Square meter"
                  className="h-7 w-auto mb-3"
                />
                <p className="text-black3 font-medium">
                  {selectedProperty?.squareMeter}m²
                </p>
              </div>

              <div>
                <img
                  src={roomIcon}
                  alt="Number of bedrooms"
                  className="h-7 w-auto mb-3"
                />
                <p className="text-black3 font-medium">
                  {selectedProperty?.room} {t("rooms")}
                </p>
              </div>

              <div>
                <img
                  src={bathroomIcon}
                  alt="Number of bathrooms"
                  className="h-7 w-auto mb-3"
                />
                <p className="text-black3 font-medium">
                  {selectedProperty?.bathroom} {t("bathrooms")}
                </p>
              </div>

              <div>
                <img
                  src={parkingIcon}
                  alt="Number of parking spots"
                  className="h-7 w-auto mb-3"
                />
                <p className="text-black3 font-medium">
                  {selectedProperty?.parking} {t("parking")}
                </p>
              </div>

              {selectedProperty?.pets ? (
                <div>
                  <img
                    src={petsIcon}
                    alt="Pets allowed"
                    className="h-7 w-auto mb-3"
                  />
                  <p className="text-black3 font-medium">
                    {selectedProperty?.pets}
                    {t("pets")}
                  </p>
                </div>
              ) : (
                ""
              )}

              {selectedProperty?.garden ? (
                <div>
                  <img
                    src={gardenIcon}
                    alt="Garden"
                    className="h-7 w-auto mb-3"
                  />
                  <p className="text-black3 font-medium">
                    {selectedProperty?.garden}
                    {t("garden")}
                  </p>
                </div>
              ) : (
                ""
              )}

              {selectedProperty?.patio ? (
                <div>
                  <img
                    src={patioIcon}
                    alt="Patio"
                    className="h-7 w-auto mb-3"
                  />
                  <p className="text-black3 font-medium">
                    {selectedProperty?.patio}
                    {t("patio")}
                  </p>
                </div>
              ) : (
                ""
              )}

              {selectedProperty?.pool ? (
                <div>
                  <img src={poolIcon} alt="Pool" className="h-7 w-auto mb-3" />
                  <p className="text-black3 font-medium">
                    {selectedProperty?.pool}
                    {t("pool")}
                  </p>
                </div>
              ) : (
                ""
              )}

              {selectedProperty?.commonAreas ? (
                <div>
                  <img
                    src={commonAreasIcon}
                    alt="Common areas"
                    className="h-7 w-auto mb-3"
                  />
                  <p className="text-black3 font-medium">
                    {selectedProperty?.commonAreas}
                    {t("communal")}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center gap-8">
              <a
                href={
                  "https://api.whatsapp.com/send?phone=51992514247&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20acerca%20de%20la%20propiedad%20%22" +
                  selectedProperty?.title +
                  "%22"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary flex items-end gap-2"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                {t("call_whatsapp")}
              </a>
            </div>
          </div>

          <div
            className={`${
              isMobile
                ? "h-96 w-screen -mt-10 left-1/2 right-1/2 "
                : "rounded-lg overflow-hidden "
            }relative`}
            style={
              isMobile ? { marginLeft: "-50vw", marginRight: "-50vw" } : {}
            }
          >
            <Slider
              {...settings}
              ref={sliderRef}
              className={`${showMap ? "!hidden " : ""}h-full`}
            >
              {selectedProperty?.imgs.map((url, index) => (
                <img
                  src={url}
                  alt=""
                  key={index}
                  className="absolute h-full w-full object-cover"
                />
              ))}
            </Slider>

            <div
              className={`${
                showMap ? "hidden " : ""
              }absolute bottom-6 right-6 flex gap-2 justify-end`}
            >
              <button
                className={`btn-slider ${
                  isBeginning ? "btn-slider-disabled" : ""
                }`}
                onClick={handlePrevious}
                disabled={isBeginning}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <button
                className={`btn-slider ${isEnd ? "btn-slider-disabled" : ""}`}
                onClick={handleNext}
                disabled={isEnd}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div
              className={`${
                showMap ? "" : "hidden "
              }h-full w-full bg-white2 rounded-lg`}
            >
              <MapComponent addresses={addressesArray} />
            </div>

            <div className="absolute top-6 left-6 flex gap-4 justify-end">
              <FavoriteBtn
                id={selectedProperty?.id}
                initialFavoriteState={selectedProperty?.favoriteState}
              />

              <button
                onClick={handleShare}
                className="btn-slider h-12 w-12 text-black4 hover:text-focusHover text-2xl"
              >
                <FontAwesomeIcon icon={faShareFromSquare} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 flex gap-2 justify-end">
              <button
                className={`${
                  showMap ? "bg-white1 text-black3 " : "bg-blue text-white1 "
                }py-2 px-4 text-lg font-bold rounded-full`}
                onClick={() => setShowMap(false)}
              >
                {selectedProperty?.imgs.length} {t("photos")}
              </button>
              <button
                className={`${
                  showMap ? "bg-blue text-white1 " : "bg-white1 text-black3 "
                }py-2 px-4 text-lg font-bold rounded-full`}
                onClick={() => setShowMap(true)}
              >
                {t("map")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 py-24 mx-auto max-w-screen-xl">
        <div className="flex flex-col justify-items-center items-center lg:items-start gap-12 lg:grid lg:grid-cols-2 lg:gap-24">
          <div className="max-w-lg">
            <h3 className="mb-4">{t("description")}</h3>

            <div className="text-black3">{selectedProperty?.description}</div>
          </div>

          <div className="max-w-sm">
            <ClientCalendar selectedPropertyId={selectedPropertyId} />

            <h3 className="mb-6">{t("send_us_message")}</h3>

            <ContactForm onSubmit={handleSubmit} fields={contactFields} />
          </div>
        </div>
      </div>

      <div className="container px-6 pb-24 mx-auto">
        <h2 className="mb-10">{t("recommended_properties")}</h2>

        <Carousel
          slides={propertiesArray.map((card, index) => (
            <Card
              key={index}
              id={card.id}
              to={card.to}
              imgs={card.imgs}
              type={card.type}
              squareMeter={card.squareMeter}
              room={card.room}
              district={card.distrito}
              rentPrice={card.rentPrice}
              dollarRentPrice={card.dollarRentPrice}
              condoPrice={card.condoPrice}
              whats={card.whats}
              favoriteState={card.favoriteState}
            />
          ))}
        />
      </div>

      <Footer />
    </>
  );
};

export default InnerPage;
