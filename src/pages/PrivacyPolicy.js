import "../App.css";
import Navbar from "../components/Navbar";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar showSearchField={false} />

      <div className="container px-6 py-24 mb-10 mx-auto max-w-2xl">
        <h1 className="mb-4">{t("policy_heading1")}</h1>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading2")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p1")}
          <br />
          <br />
          {t("policy_p2")}
          <br />
          <br />
          {t("policy_p3_1")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p3_2")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading3")}</h2>
        <p className="mb-4 text-black4">{t("policy_p4")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading4")}</h2>

        <h3 className="mt-4 mb-1 text-black3">{t("policy_heading4_1")}</h3>
        <p className="mb-4 text-black4">
          {t("policy_p4_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p4_b")}
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("policy_heading4_2")}</h3>
        <p className="mb-4 text-black4">
          {t("policy_p4_b_1")}
          <br />
          <br />
          {t("policy_p4_b_2")}
          <br />
          <br />
          {t("policy_p4_b_3")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading5")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p5")}
          <br />
          <br />
          {t("policy_p5_a")}
          <br />
          <br />
          {t("policy_p5_b")}
          <br />
          <br />
          {t("policy_p5_c")}
          <br />
          <br />
          {t("policy_p5_d")}
          <br />
          <br />
          {t("policy_p5_e")}
          <br />
          <br />
          {t("policy_p5_f")}
          <br />
          <br />
          {t("policy_p5_g")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading6")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p6_a")}
          <br />
          <br />
          {t("policy_p6_b")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading7")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p7_1")}
          <br />
          <br />
          {t("policy_p7_2")}
          <br />
          <br />
          {t("policy_p7_3")}
          <br />
          <br />
          {t("policy_p7_4")}
          <br />
          <br />
          {t("policy_p7_5")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading8")}</h2>
        <p className="mb-4 text-black4">{t("policy_p8")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading9")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p9_1")}
          <br />
          {t("policy_p9_2")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading10")}</h2>
        <p className="mb-4 text-black4">{t("policy_p10_1")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading11")}</h2>
        <p className="mb-4 text-black4">{t("policy_p11")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading12")}</h2>
        <p className="mb-4 text-black4">{t("policy_p12_1")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading13")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p13_1")}
          <br />
          <br />
          {t("policy_p13_2")}
          <br />
          <br />
          {t("policy_p13_3")}
          <br />
          <br />
          {t("policy_p13_4")}
          <br />
          <br />
          {t("policy_p13_5")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading14")}</h2>
        <p className="mb-4 text-black4">{t("policy_p14")}</p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading15")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p15_1_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p15_1_b")}
          <br />
          <br />
          {t("policy_p15_2")}
          <br />
          <br />
          {t("policy_p15_3")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading16")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p16_1_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>
          {t("policy_p16_1_b")}
          <br />
          <br />
          {t("policy_p16_2")}
          <br />
          <br />
          {t("policy_p16_3_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          , {t("policy_p16_3_b")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>
          {t("policy_p16_3_c")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading17")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p17_1_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p17_1_b")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading18")}</h2>
        <p className="mb-4 text-black4">{t("policy_p18")}</p>

        <h3 className="mt-4 mb-1 text-black3">{t("policy_heading19")}</h3>
        <p className="mb-4 text-black4">
          {t("policy_p19")}{" "}
          <a
            href="https://sered.net/legal"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://sered.net/legal
          </a>
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("policy_heading20")}</h3>
        <p className="mb-4 text-black4">
          {t("policy_p20_1")}{" "}
          <a
            href="http:// www.activecampaign.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http:// www.activecampaign.com/privacypolicy/
          </a>
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("policy_p20_2")}</h3>
        <p className="mb-4 text-black4">
          {t("policy_p20_3_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p20_3_b")}
          <br />
          <br />
          {t("policy_p20_4")}
          <br />
          {t("policy_p20_5")}
          <br />
          {t("policy_p20_6")}
          <br />
          {t("policy_p20_7")}
          <br />
          {t("policy_p20_8")}
          <br />
          {t("policy_p20_9")}
          <br />
          {t("policy_p20_10")}
          <br />
          {t("policy_p20_11_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p20_11_b")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading21")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p21")}
          <br />
          <br />
          {t("policy_p21_1")}
          <br />
          <br />
          {t("policy_p21_2")}
          <br />
          <br />
          {t("policy_p21_3")}
          <br />
          <br />
          {t("policy_p21_4")}
          <br />
          {t("policy_facebook")}{" "}
          <a
            href="https://www.facebook.com/help/323540651073243/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.facebook.com/help/323540651073243/
          </a>
          <br />
          {t("policy_youtube")}{" "}
          <a
            href="http://www.google.es/intl/es/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.google.es/intl/es/policies/privacy/
          </a>
          <br />
          {t("policy_twitter")}{" "}
          <a
            href="https://twitter.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://twitter.com/privacy
          </a>
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading22")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p22_1")}
          <br />
          <br />
          {t("policy_p22_2")}
          <br />
          <br />
          {t("policy_p22_3")}
          <br />
          <br />
          {t("policy_p22_4_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>
          {t("policy_p22_4_b")}
          <br />
          <br />
          {t("policy_p22_5_a")}{" "}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          {t("policy_p22_5_b")}
          <br />
          <br />
          {t("policy_p22_6_a")}{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://adssettings.google.com/
          </a>
          {t("policy_p22_6_b")}{" "}
          <a
            href="https://policies.google.com/technologies/ads?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/technologies/ads?hl=es
          </a>
          <br />
          <br />
          {t("policy_p22_7")}
          <br />
          <br />
          {t("policy_p22_8")}
          <br />
          <br />
          {t("policy_p22_9")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading23")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p33_1")}
          <br />
          <br />
          {t("policy_p33_2")}
          <br />
          <br />
          {t("policy_p33_3")}
          <br />
          {t("policy_facebook")}{" "}
          <a
            href="https://www.facebook.com/help/323540651073243/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.facebook.com/help/323540651073243/
          </a>
          <br />
          {t("policy_youtube")}{" "}
          <a
            href="http://www.google.es/intl/es/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.google.es/intl/es/policies/privacy/
          </a>
          <br />
          {t("policy_twitter")}{" "}
          <a
            href="https://twitter.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://twitter.com/privacy
          </a>
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading24")}</h2>
        <p className="mb-4 text-black4">
          {t("policy_p34_1")}
          <br />
          <br />
          {t("policy_p34_2")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("policy_heading25")}</h2>
        <p className="mb-4 text-black4">{t("policy_p35")}</p>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
