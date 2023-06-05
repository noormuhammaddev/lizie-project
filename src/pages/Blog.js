import "../App.css";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

const Blog = (onSubmit) => {
  const [search, setCode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ search });
  }

  return (
    <>
      <Navbar showSearchField={false} />

      <div className="container px-6 pb-24 pt-20 mb-10 mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
          <h1 className="mb-4">Blog</h1>

          <p className="subtitle text-black4 mb-10">
            En nuestra página de blog, encontrarás información actualizada y
            útil sobre el mercado inmobiliario, consejos para alquilar
            propiedades residenciales, y noticias relevantes.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setCode(e.target.value)}
              required
              className="form-input"
              placeholder="Buscar artículos"
            />

            <button className="flex p-4 absolute right-0 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-black4 text-xl"
              />
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-8 mb-12 lg:flex-row">
          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
            text="Si estás buscando vender tu casa, es probable que quieras hacerlo rápidamente y al mejor precio posible. Para lograr esto, es necesario preparar bien la propiedad y planificar una estrategia adecuada para la venta."
            isFocus={true}
          />

          <div className="flex flex-col justify-between gap-6">
            <PostCard
              to="/"
              img="https://picsum.photos/800/1200"
              title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
              isHorizontal={true}
            />

            <PostCard
              to="/"
              img="https://picsum.photos/800/1200"
              title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
              isHorizontal={true}
            />

            <PostCard
              to="/"
              img="https://picsum.photos/800/1200"
              title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
              isHorizontal={true}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />

          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />

          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />

          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />

          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />

          <PostCard
            to="/"
            img="https://picsum.photos/800/1200"
            title="5 consejos clave para vender tu casa rápidamente: cómo maximizar la venta de tu propiedad"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
