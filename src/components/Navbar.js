import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import MyDropdown from "./HeaderDropdown";
import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props, onSubmit) => {
  const { search, setSearch } = props;

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (
      currentUser === "undefined" ||
      currentUser === null ||
      Object.keys(currentUser).length === 0
    ) {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [currentUser]);

  // const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ search });
  }

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18next.changeLanguage(selectedLanguage);
  };

  return (
    <>
      <nav className="text-black3">
        <div className="container py-4 px-6 mx-auto gap-12 lg:flex lg:justify-between">
          <div className="relative flex flex-col justify-between w-full gap-4 lg:max-w-lg lg:flex-row lg:items-center lg:gap-12">
            <Link
              to="/"
              className="text-xl font-semibold uppercase tracking-widest w-fit"
            >
              Vivendas
            </Link>

            {props.showSearchField ? (
              <form onSubmit={handleSubmit} className="w-full relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  required
                  className="form-input"
                  placeholder={t("navbar_searchbar")}
                />

                <button
                  disabled
                  className="flex p-4 absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-black4 text-xl"
                  />
                </button>
              </form>
            ) : (
              ""
            )}

            <button
              type="button"
              aria-label="toggle menu"
              onClick={toggleMenu}
              className="absolute right-0 lg:hidden"
            >
              <FontAwesomeIcon icon={faBars} className="text-black3 text-3xl" />
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:w-auto lg:gap-8">
            <Link to="/featuredproperties">{t("nav_properties")}</Link>

            <Link to="/about-us">{t("nav_aboutus")}</Link>

            <Link to="/contact">{t("nav_contactus")}</Link>

            <select
              defaultValue={i18next.language}
              className="lngSelect bg-transparent -m-1"
              onChange={handleLanguageChange}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
            </select>
            {isUser ? (
              <MyDropdown />
            ) : (
              <Link
                to="/login"
                className="block mt-4 md:inline-block md:mt-0 ml-8"
              >
                {t("navbar_login")}
              </Link>
            )}
          </div>
        </div>

        <div
          className={`${
            isOpen ? "opacity-100 visible " : "opacity-0 invisible "
          }transition duration-300 w-screen bg-black bg-opacity-50 fixed inset-0 z-50 lg:hidden`}
        >
          <div
            className={`${
              isOpen ? "translate-x-0 " : "-translate-x-full "
            }transition duration-300 h-full w-4/5 bg-white1 py-4 px-6`}
          >
            <div className="flex justify-between mb-8">
              <Link
                to="/"
                className="block text-xl font-semibold tracking-widest"
              >
                VIVENDAS
              </Link>

              <button
                type="button"
                aria-label="toggle menu"
                onClick={toggleMenu}
                className="px-2 -mr-2"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-black4 text-3xl"
                />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <Link to="/properties" className="w-fit">
                {t("nav_properties")}
              </Link>

              <Link to="/about-us" className="w-fit">
                {t("nav_aboutus")}
              </Link>

              <Link to="/contact" className="w-fit">
                {t("nav_contactus")}
              </Link>

              <select
                defaultValue="es"
                className="lngSelect bg-transparent self-start w-fit -m-1"
                onChange={handleLanguageChange}
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
                <option value="pt">PT</option>
              </select>
              {isUser ? (
                <MyDropdown />
              ) : (
                <Link
                  to="/login"
                  className="block mt-4 md:inline-block md:mt-0 ml-8 "
                >
                  {t("navbar_login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
