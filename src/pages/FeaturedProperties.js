import "../App.css";
import Navbar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PropertyContext } from "../context/PropertyContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpToLine,
  faListUl,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import Card from "../components/Card";
import MapComponent from "../components/Map";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const FeaturedProperties = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedSizeOrder, setSelectedSizeOrder] = useState("");
  const [search, setSearch] = useState("");

  const handleSizeOrderChange = (event) => {
    setSelectedSizeOrder(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
  };

  const toggleShowFilters = () => {
    setSelectedPrice("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { propertiesArray } = React.useContext(PropertyContext);

  const addressesArray = propertiesArray.map((card) => card.address);

  const [showMap, setShowMap] = useState(window.innerWidth > 1023);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  const [trigger, setTrigger] = useState(0);
  const [divIndex, setDivIndex] = useState(null);
  const handleHover = (index) => {
    setDivIndex(index);
    setTrigger((trigger) => trigger + 1);
  };

  const filteredData = propertiesArray.filter((item) => {
    const title = String(item.title);
    const address = String(item.address);

    return title.includes(search) || address.includes(search);
  });
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const { propertyData } = location.state;
      setSelectedDistrict(propertyData.District);
      setSelectedPropertyType(propertyData.PropertyType);
    }
  }, [location.state]);

  useEffect(() => {
    const selectElement = document.getElementById("district-select");
    const selectElement2 = document.getElementById("property-select");
    if (selectElement) {
      selectElement.value = selectedDistrict;
    }
    if (selectElement2) {
      selectElement2.value = selectedPropertyType;
    }
  }, [selectedDistrict, selectedPropertyType]);

  return (
    <>
      <div className={`${!isMobile ? "h-screen overflow-hidden" : ""}`}>
        <div className="bg-bg">
          <Navbar
            showSearchField={true}
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="container px-6 py-10 mx-auto">
          <div
            className={`${
              isMobile ? "grid-cols-1 " : "grid-cols-2 "
            }grid gap-8`}
          >
            <div
              className={`${
                !showMap && !isMobile ? "col-span-2" : "col-span-1"
              }`}
            >
              <div
                className={`${!showMap && !isMobile ? "grid grid-cols-2" : ""}`}
              >
                {isMobile ? (
                  <div className="flex justify-between mb-8">
                    <button
                      type="button"
                      aria-label="toggle section"
                      onClick={toggleShowFilters}
                      className="subtitle text-black2 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faSliders} />
                      Filtros
                    </button>

                    {showMap ? (
                      <button
                        type="button"
                        aria-label="toggle section"
                        onClick={toggleShowMap}
                        className="subtitle text-black2 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faListUl} />
                        {t("btn_seelist")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="toggle section"
                        onClick={toggleShowMap}
                        className="subtitle text-black2 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faMap} />
                        {t("btn_map")}
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}

                <form
                  className={`${
                    isMobile && showFilters ? "flex flex-col " : ""
                  } ${isMobile && !showFilters ? "hidden " : ""} ${
                    !isMobile ? "flex " : ""
                  }items-center gap-4 mb-8`}
                >
                  <select
                    id="district-select"
                    defaultValue={selectedDistrict}
                    className="form-input"
                    onChange={handleSelectChange}
                  >
                    <option value="" className="bg-gray-200 text-gray-600">
                      {t("filter_district")}
                    </option>

                    <option value="miraflores">Miraflores</option>
                    <option value="sanIsidro">San Isidro</option>
                    <option value="surco">Surco</option>
                    <option value="laMolina">La Molina</option>
                    <option value="barranco">Barranco</option>
                  </select>

                  <select
                    id="property-select"
                    defaultValue={selectedPropertyType}
                    className="form-input"
                    onChange={handlePropertyTypeChange}
                  >
                    <option className="bg-gray-200 text-gray-600" value="">
                      {t("filter_type")}
                    </option>
                    <option value="casa">casa</option>
                    <option value="departamento">Departamento</option>
                  </select>

                  <select
                    value={selectedOrder}
                    onChange={handleOrderChange}
                    className="form-input"
                  >
                    <option value="" className="bg-gray-200 text-gray-600">
                      {t("filter_price")}
                    </option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>

                  <select
                    value={selectedSizeOrder}
                    onChange={handleSizeOrderChange}
                    className="form-input"
                  >
                    <option value="" className="bg-gray-200 text-gray-600">
                      {t("filter_size")}
                    </option>
                    <option value="smallToBig">Small to Big</option>
                    <option value="bigToSmall">Big to Small</option>
                  </select>

                  {isMobile ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      aria-label="toggle section"
                      onClick={toggleShowMap}
                    >
                      <FontAwesomeIcon
                        icon={faArrowsUpToLine}
                        rotation={showMap ? 90 : 270}
                        className="text-2xl text-blue transition cursor-pointer hover:text-focusHover"
                      />
                    </button>
                  )}
                </form>
              </div>

              <div
                className={`${
                  !isMobile ? "cards-section overflow-y-scroll pr-4 " : ""
                }${showMap && !isMobile ? "grid-cols-1 " : ""}${
                  !showMap && !isMobile ? "grid-cols-2 " : ""
                }${showMap && isMobile ? "hidden " : ""}${
                  !showMap && isMobile ? "grid-cols-1 " : ""
                }transition-all grid gap-8`}
              >
                {filteredData
                  .filter(
                    (card) =>
                      (selectedPrice === "" ||
                        selectedPrice === "all" ||
                        card.rentPrice === selectedPrice) &&
                      (selectedPropertyType === "" ||
                        card.type === selectedPropertyType) &&
                      (selectedDistrict === "" ||
                        card.district === selectedDistrict)
                  )
                  .sort((a, b) => {
                    if (selectedOrder === "lowToHigh") {
                      return a.rentPrice - b.rentPrice;
                    } else if (selectedOrder === "highToLow") {
                      return b.rentPrice - a.rentPrice;
                    } else if (selectedSizeOrder === "smallToBig") {
                      return a.squareMeter - b.squareMeter;
                    } else if (selectedSizeOrder === "bigToSmall") {
                      return b.squareMeter - a.squareMeter;
                    } else {
                      return 0;
                    }
                  })
                  .map((card, index) => (
                    <Card
                      key={index}
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
                      isHorizontal={!isMobile}
                      onMouseEnter={() => handleHover(index)}
                    />
                  ))}

                <div
                  className={`${
                    !showMap && !isMobile ? "col-span-2 " : ""
                  }flex flex-col items-center text-center gap-6 my-24`}
                >
                  <h3>
                    {t("property_help1")}
                    <br />
                    {t("property_help2")}
                  </h3>

                  <Link to="/contact" className="btn-primary">
                    {t("btn_contactus")}
                  </Link>
                </div>
              </div>
            </div>

            <div
              className={`${showMap ? "" : "hidden "} ${
                isMobile ? "h-96 " : ""
              } bg-black rounded-lg`}
            >
              <MapComponent
                addresses={addressesArray}
                divIndex={divIndex}
                trigger={trigger}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeaturedProperties;
