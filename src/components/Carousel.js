import '../App.css';
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = (props) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      const { currentSlide, slideCount, slidesToShow } = sliderRef.current.innerSlider.state;
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
    infinite: false,
    speed: 150,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    beforeChange: (current, next) => {
      setIsBeginning(next === 0);
      setIsEnd(next === props.slides.length - settings.slidesToShow);
    }
  };

  return (
    <>
      <Slider {...settings} ref={sliderRef} className="mb-10 mx-4">
        {props.slides.map((slide, index) => (
          <div key={index} className="items-gap">
            {slide}
          </div>
        ))}
      </Slider>

      <div className="flex gap-2 justify-end">
        <button className={`btn-slider ${isBeginning ? 'btn-slider-disabled' : ''}`} onClick={handlePrevious} disabled={isBeginning}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <button className={`btn-slider ${isEnd ? 'btn-slider-disabled' : ''}`} onClick={handleNext} disabled={isEnd}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
}

export default Carousel;