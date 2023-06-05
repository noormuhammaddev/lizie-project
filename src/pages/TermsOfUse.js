import "../App.css";
import Navbar from "../components/Navbar";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const TermsOsUse = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar showSearchField={false} />

      <div className="container px-6 py-24 mb-10 mx-auto max-w-2xl">
        <h1 className="mb-4">{t("terms_title")}</h1>

        <h2 className="mt-8 mb-2 text-black2">{t("terms_h1")}</h2>
        <p className="mb-4 text-black4">
          {t("terms_p1_a")}
          <br />
          <br />
          {t("terms_p1_b")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("terms_h2")}</h2>

        <h3 className="mt-4 mb-1 text-black3">{t("terms_h2_a")}</h3>
        <p className="mb-4 text-black4">
          {t("terms_p2_a_1")}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>{" "}
          de ahora en
          {t("terms_p2_a_2")}
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("terms_h2_b")}</h3>
        <p className="mb-4 text-black4">
          {t("terms_p2_b")}
          <br />
          <br />
          {t("terms_p2_c")}
          <br />
          <br />
          {t("terms_p2_d")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("terms_h3")}</h2>
        <p className="mb-4 text-black4">
          {t("terms_p3_a")}
          <br />
          <br />
          {t("terms_p3_b")}
          <br />
          <br />
          {t("terms_p3_c")}
          <br />
          <br />
          {t("terms_p3_d")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("terms_h4")}</h2>
        <p className="mb-4 text-black4">
          {t("terms_p4_a")}
          <br />
          <br />
          {t("terms_p4_b")}
          <br />
          <br />
          {t("terms_p4_c")}
          <br />
          <br />
          {t("terms_p4_d")}
          <br />
          <br />
          {t("terms_p4_e")}
          <br />
          <br />
          {t("terms_p4_f")}
        </p>

        <h2 className="mt-8 mb-2 text-black2">{t("terms_h5")}</h2>
        <p className="mb-4 text-black4">
          {t("terms_p5_1")}
          <a
            href="https://www.vivenda.pe"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vivenda.pe
          </a>
          {t("terms_p5_2")}
          <br />
          {t("terms_p5_3")}
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("terms_h5_a")}</h3>
        <p className="mb-4 text-black4">
          {t("terms_p5_a")}
          <br />
          <br />
          {t("terms_p5_b")}
          <br />
          <br />
          {t("terms_p5_c")}
          <br />
          <br />
          {t("terms_p5_d")}
          <br />
          <br />
          {t("terms_p5_e")}
        </p>

        <h3 className="mt-4 mb-1 text-black3">{t("terms_h5_b")}</h3>
        <p className="mb-4 text-black4">
          {t("terms_p5_f")}
          <br />
          <br />
          {t("terms_p5_g")}
          <br />
          <br />
          {t("terms_p5_h")}
          <br />
          <br />
          {t("terms_p5_i")}
          <br />
          <br />
          {t("terms_p5_j")}
          <br />
          <br />
          {t("terms_p5_k")}
          <br />
          <br />
          {t("terms_p5_l")}
          <br />
          <br />
          {t("terms_p5_m")}
          <br />
          <br />
          {t("terms_p5_n")}
          <br />
          <br />
          {t("terms_p5_o")}
          <br />
          <br />
          {t("terms_p5_p")}
          <br />
          <br />
          {t("terms_p5_q")}
          <br />
          <br />
          {t("terms_p5_r")}
          <br />
          <br />
          {t("terms_p5_s")}
          <br />
          <br />
          {t("terms_p5_t")}
        </p>

        <h3 className="mt-4 mb-1 text-black6">{t("terms_heading6")}</h3>
        <p className="mb-4 text-black7">
          {t("terms_p6_a")}
          <br />
          <br />
          {t("terms_p6_b")}
          <br />
          <br />
          {t("terms_p6_c")}
        </p>

        <h3 className="mt-4 mb-1 text-black6">{t("terms_heading7")}</h3>
        <p className="mb-4 text-black7">
          {t("terms_p7_a")}
          <br />
          <br />
          {t("terms_p7_b")}
          <br />
          <br />
          {t("terms_p7_c")}
          <br />
          <br />
          {t("terms_p7_d")}
        </p>

        <h2 className="mt-8 mb-2 text-black8">{t("terms_heading8")}</h2>
        <p className="mb-4 text-black7">{t("terms_p8_a")}</p>

        <h2 className="mt-8 mb-2 text-black8">{t("terms_heading9")}</h2>
        <p className="mb-4 text-black7">
          {t("terms_p9_a")}
          <br />
          <br />
          {t("terms_p9_b")}
          <br />
          <br />
          {t("terms_p9_c")}
        </p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading10")}</h2>
        <p className="mb-4 text-black7">{t("terms_p10")}</p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading11")}</h2>
        <p className="mb-4 text-black7">
          {t("terms_p20")}
          <br />
          <br />
          {t("terms_p21")}
          <br />
          <br />
          {t("terms_p22")}
          <br />
          <br />
          {t("terms_p23")}
        </p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading12")}</h2>
        <p className="mb-4 text-black7">
          {t("terms_p25")}
          <br />
          <br />
          {t("terms_p26")}
          <br />
          <br />
          {t("terms_p27")}
          <br />
          <br />
          {t("terms_p28")}
        </p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading13")}</h2>
        <p className="mb-4 text-black7">
          {t("terms_p30")}
          <br />
          <br />
          {t("terms_p31")}
        </p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading14")}</h2>
        <p className="mb-4 text-black7">{t("terms_p33")}</p>

        <h2 className="mt-8 mb-2 text-black6">{t("terms_heading15")}</h2>
        <p className="mb-4 text-black7">{t("terms_p35")}</p>
      </div>

      <Footer />
    </>
  );
};

export default TermsOsUse;
