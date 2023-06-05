import "../App.css";
import HeaderBanner from "../components/HeaderBanner";
import Navbar from "../components/Navbar";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import bannerImg from "../assets/img/about-header-img.webp";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar showSearchField={false} />

      <HeaderBanner
        img={bannerImg}
        title={t("about_banner_title")}
        texto={t("about_banner_description")}
      />

      <div className="container px-6 py-24 mb-10 mx-auto max-w-2xl">
        <h2 className="mb-4">{t("about_page_title")} </h2>

        <p className="text-black3 mb-10">
          {t("about_page_description_p1")}
          <br />
          <br />
          {t("about_page_description_p2")}
          <br />
          <br />
          {t("about_page_description_p3")}
          <br />
          <br />
          {t("about_page_description_p4")}
        </p>

        <h3 className="text-black2 mb-4">{t("about_page_help")}</h3>

        <Link to="/contact" className="btn-primary">
          {t("nav_contactus")}
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
