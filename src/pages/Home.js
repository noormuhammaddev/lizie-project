import "../App.css";
import HeaderBanner from "../components/HeaderBanner";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import stepsImg from "../assets/img/steps-img.webp";
import featuresImg from "../assets/img/features-img.webp";
import wave1 from "../assets/img/wave1.svg";
import wave2 from "../assets/img/wave2.svg";
import { Link } from "react-router-dom";
import Review from "../components/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import bannerImg from "../assets/img/home-header-img.webp";
import { PropertyContext } from "../context/PropertyContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { propertiesArray } = React.useContext(PropertyContext);
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const propertyData = {
      District: district,
      PropertyType: propertyType,
      Location: searchInput,
    };
    navigate("/featuredproperties", { state: { propertyData } });

    // Log the form data
    console.log("District:", district);
    console.log("Property Type:", propertyType);
    console.log("Search Input:", searchInput);

    // You can perform further actions with the form data here
  };
  return (
    <>
      <Navbar />

      <HeaderBanner
        img={bannerImg}
        title={t("banner_title")}
        texto={t("banner_description")}
        extraElement={
          <div className="mt-10">
            <div className="px-4 pt-3 pb-1 bg-white1 rounded-t-lg w-fit">
              <p className="font-bold text-lg text-blue">{t("filter_title")}</p>
            </div>

            <form
              className="flex  flex-col p-6 bg-white1 rounded-b-lg rounded-tr-lg xl:flex-row lg:justify-between xl:p-4"
              onSubmit={handleSubmit}
            >
              <select
                name="district"
                defaultValue=""
                onChange={handleDistrictChange}
                className="bg-transparent font-normal lg:flex-1 text-black3 -m-1"
              >
                <option value="">{t("filter_district")}</option>
                <option value="miraflores">Miraflores</option>
                <option value="sanIsidro">San Isidro</option>
                <option value="surco">Surco</option>
                <option value="laMolina">La Molina</option>
                <option value="barranco">Barranco</option>
              </select>

              <div className="h-px w-full my-6 bg-border xl:h-auto xl:w-px xl:m-5"></div>

              <select
                defaultValue=""
                onChange={handlePropertyTypeChange}
                className="bg-transparent font-normal lg:flex-1 text-black3 -m-1"
              >
                <option className="bg-gray-200 text-gray-600" value="">
                  {t("filter_type")}
                </option>
                <option value="casa">{t("filter_house")}</option>
                <option value="departamento">{t("filter_department")}</option>
              </select>

              <div className="h-px w-full my-6 bg-border xl:h-auto xl:w-px xl:m-5"></div>

              <button className="btn-primary mt-5 xl:mt-0 xl:ml-5">
                {t("filter_button")}
              </button>
            </form>
          </div>
        }
      />

      <div className="container px-6 py-10 mx-auto">
        <div className="flex flex-col gap-6 justify-between mb-10 sm:flex-row">
          <h2>{t("recommended_properties")}</h2>

          <div className="flex items-center flex-shrink-0 gap-4">
            <Link to=".." className="link-primary">
              {t("btn_map")}
            </Link>

            <Link to="/properties" className="btn-primary">
              {t("btn_seeall")}
            </Link>
          </div>
        </div>

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
              district={card.district}
              rentPrice={card.rentPrice}
              dollarRentPrice={card.dollarRentPrice}
              condoPrice={card.condoPrice}
              favoriteState={card.favoriteState}
            />
          ))}
        />
      </div>

      <div className="bg-bg relative">
        <img src={wave1} alt="" className="absolute -top-2 w-screen" />
        <img src={wave2} alt="" className="absolute -bottom-2 w-screen" />

        <div className="container px-6 py-36 mx-auto">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-24">
            <div className="rounded-lg overflow-hidden mt-10 lg:relative lg:mt-0">
              <img
                src={stepsImg}
                alt=""
                className="object-cover w-full h-96 lg:absolute lg:h-full"
              />
            </div>

            <div>
              <h2 className="mb-4">{t("process_title")}</h2>
              <p className="subtitle text-black4 mb-10">
                {t("process_description")}
              </p>

              <div className="flex gap-6 mb-8">
                <span className="font-bold text-5xl text-blue">1</span>

                <div>
                  <p className="title text-black2 mb-2">{t("process_h_1")}</p>
                  <p className="text-black3">{t("process_p_1")}</p>
                </div>
              </div>

              <div className="flex gap-6 mb-8">
                <span className="font-bold text-5xl text-blue">2</span>

                <div>
                  <p className="title text-black2 mb-2">{t("process_h_2")}</p>
                  <p className="text-black3">{t("process_p_2")}</p>
                </div>
              </div>

              <div className="flex gap-6 mb-8">
                <span className="font-bold text-5xl text-blue">3</span>

                <div>
                  <p className="title text-black2 mb-2">{t("process_h_3")}</p>
                  <p className="text-black3">{t("process_p_3")}</p>
                </div>
              </div>

              <div className="flex gap-6 mb-10">
                <span className="font-bold text-5xl text-blue">4</span>

                <div>
                  <p className="title text-black2 mb-2">{t("process_h_4")}</p>
                  <p className="text-black3">{t("process_p_4")}</p>
                </div>
              </div>

              <p className="subtitle text-black4 mb-4">{t("process_footer")}</p>

              <div className="flex items-center gap-4">
                <Link to="/contact" className="btn-primary">
                  {t("btn_talk")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 py-24 mx-auto">
        <div className="max-w-xl mb-10">
          <h2 className="mb-4">{t("reviews_title")}</h2>
          <p className="subtitle text-black4">{t("reviews_description")}</p>
        </div>

        <Carousel
          slides={[
            <Review
              title={t("review1_title")}
              text={t("review1_description")}
              name="Jose Eduardo Q."
            />,

            <Review
              title={t("review2_title")}
              text={t("review2_description")}
              name="María B."
            />,

            <Review
              title={t("review3_title")}
              text={t("review3_description")}
              name="Mayra M."
            />,

            <Review
              title={t("review4_title")}
              text={t("review4_description")}
              name="Adrián R."
            />,

            <Review
              title={t("review5_title")}
              text={t("review5_description")}
              name="Adriana C."
            />,
          ]}
        />
      </div>

      <div className="bg-bg relative">
        <img src={wave1} alt="" className="absolute -top-2 w-screen" />

        <div className="container px-6 py-36 mx-auto">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-24">
            <div className="rounded-lg overflow-hidden mt-10 lg:relative lg:mt-0">
              <img
                src={featuresImg}
                alt=""
                className="object-cover w-full h-96 lg:absolute lg:h-full"
              />
            </div>

            <div className="flex flex-col items-start gap-10">
              <div>
                <h2 className="mb-4">{t("contact_title")}</h2>
                <p className="subtitle text-black4">
                  {t("contact_description")}
                </p>
              </div>

              <div>
                <p className="subtitle text-black2 !font-medium mb-6">
                  {t("we_offer")}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 lg:flex-col lg:gap-4 xl:flex-row xl:gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_1")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_2")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_3")}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_4")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_5")}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-base text-blue"
                      />
                      <p className="text-blue">{t("offer_6")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn-primary">
                {t("btn_knowmore")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
