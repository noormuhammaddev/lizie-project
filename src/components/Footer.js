import React from "react";
import { Link } from "react-router-dom";
import { faWhatsapp, faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import whatsappQr from "../assets/img/whatsapp-qr.webp";
import libroDeReclamaciones from "../assets/img/libro-de-reclamaciones.webp";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation();

  return (
    <>
      <div className="bg-footerBg">
        <div className="container px-6 py-16 mx-auto lg:py-20">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:gap-0">
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <h2 className="text-white1 mb-4">Vivendas</h2>

                <p className="text-black4 mb-6">
                  © 2023 Vivenda.pe
                  <br/>
                  {t('footer_info')}
                  <br/>
                  Vivenda S.A.C - RUC 00000000000
                </p>
              </div>

              <div className="flex gap-4">
                <a href="https://www.instagram.com/vivendaperu/" target="_blank" rel="noopener noreferrer" className="text-xl rounded-full h-10 w-10 flex items-center justify-center transition bg-focus text-white1 hover:bg-focusHover"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://www.facebook.com/VivendaPeru/" target="_blank" rel="noopener noreferrer" className="text-xl rounded-full h-10 w-10 flex items-center justify-center transition bg-focus text-white1 hover:bg-focusHover"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://www.linkedin.com/company/vivendaperu/" target="_blank" rel="noopener noreferrer" className="text-xl rounded-full h-10 w-10 flex items-center justify-center transition bg-focus text-white1 hover:bg-focusHover"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="title text-white1 mb-4">{t('footer_talk')}</h3>
              
              <a href="https://api.whatsapp.com/send?phone=51992514247&text=Hola!%20Me%20gustaria%20saber%20mas%20acerca%20de%20las%20propiedades%C2%A0disponibles" className="text-white2 transition flex items-center w-fit gap-2 mb-4 hover:text-white1" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                <p>(+51) 922 514 247</p>
              </a>

              <img src={whatsappQr} alt="QR code for Vivendas WhatsApp" className="w-36 h-auto" />
            </div>

            <div className="flex flex-col">
              <h3 className="title text-white1 mb-4">{t('footer_navigation')}</h3>
              
              <Link to="/properties" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">{t('nav_properties')}</p>
              </Link>
              <Link to="/about-us" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">{t('nav_aboutus')}</p>
              </Link>
              {/*
              <Link to="/" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">Blog</p>
              </Link>
              */}
              <Link to="/contact" className="w-fit">
                <p className="text-white2 transition hover:text-white1">{t('nav_contactus')}</p>
              </Link>
            </div>
            
            <div className="flex flex-col">
              <h3 className="title text-white1 mb-4">{t('footer_company')}</h3>
              
              <Link to="/terms-of-use" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">{t('footer_legal')}</p>
              </Link>

              {/*
              <Link to="">
                <p className="text-white2 transition hover:text-white1 mb-2">Política de cookies</p>
              </Link>
              */}

              {/*
              <Link to="/">
                <p className="text-white2 transition hover:text-white1 mb-2">Política de uso</p>
              </Link>
              */}

              <Link to="/privacy-policy" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">{t('footer_privacypolicy')}</p>
              </Link>

              <Link to="/terms-of-use" className="w-fit">
                <p className="text-white2 transition mb-2 hover:text-white1">{t('footer_termsconditions')}</p>
              </Link>

              <Link to="/service-contracting-policy" className="w-fit">
                <p className="text-white2 transition mb-4 hover:text-white1">{t('footer_contract_terms')}</p>
              </Link>

              <Link to="/libro-de-reclamaciones" className="w-fit">
                <img src={libroDeReclamaciones} alt="Libro de Reclamaciones" className="h-20 w-auto rounded-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;