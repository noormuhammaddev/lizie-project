import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import squareMeterIcon from "../assets/icon/square-meter-grey.svg";
import roomIcon from "../assets/icon/room-grey.svg";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteBtn from "./FavoriteBtn";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    draggable: false,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  // const handleMouseEnter = () => {
  //   const cardBtnSlider = cardRef.current.querySelectorAll(".card-btn-slider");
  //   const slickDots = cardRef.current.querySelector(".slick-dots");
  //   cardBtnSlider.forEach((btn) => btn.classList.add("card-btn-slider-active"));
  //   slickDots.classList.add("slick-dots-active");
  // };

  // const handleMouseLeave = () => {
  //   const cardBtnSlider = cardRef.current.querySelectorAll(".card-btn-slider");
  //   const slickDots = cardRef.current.querySelector(".slick-dots");
  //   cardBtnSlider.forEach((btn) =>
  //     btn.classList.remove("card-btn-slider-active")
  //   );
  //   slickDots.classList.remove("slick-dots-active");
  // };

  const handleMouseEnter = () => {
    const cardBtnSlider = cardRef.current?.querySelectorAll(".card-btn-slider");
    const slickDots = cardRef.current?.querySelector(".slick-dots");
    if (cardBtnSlider && slickDots) {
      cardBtnSlider.forEach((btn) =>
        btn.classList.add("card-btn-slider-active")
      );
      slickDots.classList.add("slick-dots-active");
    }
  };

  const handleMouseLeave = () => {
    const cardBtnSlider = cardRef.current?.querySelectorAll(".card-btn-slider");
    const slickDots = cardRef.current?.querySelector(".slick-dots");
    if (cardBtnSlider && slickDots) {
      cardBtnSlider.forEach((btn) =>
        btn.classList.remove("card-btn-slider-active")
      );
      slickDots.classList.remove("slick-dots-active");
    }
  };

  useEffect(() => {
    const cardBtnSlider = cardRef.current.querySelectorAll(".card-btn-slider");

    cardBtnSlider.forEach((btn) => {
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cardBtnSlider.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`${
          props.isHorizontal ? "grid grid-cols-2 gap-6 " : ""
        }property-card`}
        onMouseEnter={props.onMouseEnter}
      >
        <div className="relative">
          <Link to={`/inner-page/${props.id}`} className="slider-hover">
            <Slider
              {...settings}
              ref={sliderRef}
              className={`${
                props.isHorizontal ? "" : "mb-4 "
              }h-full rounded-lg overflow-hidden`}
            >
              {props.imgs?.map((url, index) => (
                <img
                  src={url}
                  alt=""
                  key={index}
                  className={`${
                    props.isHorizontal ? "absolute h-full " : "h-56 "
                  }w-full object-cover`}
                />
              ))}
            </Slider>
          </Link>

          <button
            className="card-btn-slider left-2"
            onClick={handlePrevious}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="card-btn-slider right-2"
            onClick={handleNext}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div>
          <Link
            to={`/inner-page/${props.id}`}
            className={`${
              props.isHorizontal ? "flex-col gap-3 mb-3 " : "mb-2 "
            }flex justify-between`}
          >
            <div>
              <span className="text-black4">{props.type}</span>
              <h4
                className={`${
                  props.isHorizontal ? "" : "hidden "
                }text-black2 mt-2`}
              >
                {props.distrito}
              </h4>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <img
                  src={squareMeterIcon}
                  alt="Square meter"
                  className="h-5 w-auto"
                />
                <p className="text-black4">{props.squareMeter}</p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={roomIcon}
                  alt="Number of bedrooms"
                  className="h-5 w-auto"
                />
                <p className="text-black4">{props.room}</p>
              </div>
            </div>
          </Link>

          <Link to={`/inner-page/${props.id}`}>
            <h4
              className={`${
                props.isHorizontal ? "hidden " : ""
              }text-black2 mb-3`}
            >
              {props.district}
            </h4>

            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-black3 subtitle">
                {t('filter_title')} S/. {props.rentPrice}
              </p>
              <span className="text-black4">(USD {props.dollarRentPrice})</span>
            </div>
          </Link>

          <div className="flex justify-between">
            <Link to={`/inner-page/${props.id}`} className="flex">
              <span className="text-black4">
                {t('maintenance')} S/. {props.condoPrice}
              </span>
            </Link>

            <div className="flex gap-4 self-end">
              <a
                href={
                  "https://api.whatsapp.com/send?phone=51992514247&text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20acerca%20de%20la%20propiedad%20%22" +
                  props.title +
                  "%22"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-black4 cursor-pointer transition hover:text-focusHover text-2xl"
                />
              </a>

              <FavoriteBtn
                id={props.id}
                initialFavoriteState={props.favoriteState}
                onlyIcon={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
