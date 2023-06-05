import "../App.css";
import HeaderBanner from "../components/HeaderBanner";
import Navbar from "../components/Navbar";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import bannerImg from "../assets/img/contact-header-img.webp";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import whatsappQr from "../assets/img/whatsapp-qr.webp";
import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const contactFields = {
    buttonText: t("contact_form1_btn"),
    showMessageField: true,
  };

  const workFields = {
    buttonText: t("contact_form2_btn"),
    showCodeField: true,
  };

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Navbar showSearchField={false} />

      <HeaderBanner
        img={bannerImg}
        title={t("contact_banner_title")}
        extraElement={
          <div className="flex flex-col sm:flex-row gap-8 mt-8">
            <img
              src={whatsappQr}
              alt="QR code for Vivendas WhatsApp"
              className="w-36 h-auto"
            />

            <div>
              <p className="subtitle text-black4 mb-8">
                {t("contact_banner_description_p1")}
                <br />
                {t("contact_banner_description_p2")}
              </p>

              <a
                href="https://api.whatsapp.com/send?phone=51992514247&text=Hola!%20Me%20gustaria%20saber%20mas%20acerca%20de%20las%20propiedades%C2%A0disponibles"
                className="text-focus transition flex items-center gap-2 mb-4 hover:text-focusHover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                <p className="link-primary">(+51) 922 514 247</p>
              </a>
            </div>
          </div>
        }
      />

      <div className="container px-6 py-24 mb-10 mx-auto max-w-2xl">
        <h2 className="mb-6">{t("contact_form1_title")}</h2>
        <ContactForm onSubmit={handleSubmit} fields={contactFields} />

        <h2 className="mt-12 mb-6">{t("contact_form2_title")}</h2>
        <ContactForm onSubmit={handleSubmit} fields={workFields} />
      </div>

      <Footer />
    </>
  );
};

export default Contact;
