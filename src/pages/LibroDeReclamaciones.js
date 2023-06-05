import "../App.css";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";

const LibroDeReclamaciones = (onSubmit) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, phone, date, message });
  }

  return (
    <>
      <Navbar showSearchField={false} />

      <form
        onSubmit={handleSubmit}
        className="container px-6 py-24 mb-10 mx-auto max-w-2xl"
      >
        <h1 className="mb-6">Libro de Reclamaciones</h1>

        <label className="sr-only">Su nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input mb-4"
          placeholder="Su nombre"
        />

        <div className="flex gap-4 mb-4">
          <label className="sr-only">Su teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
            placeholder="Su teléfono"
          />

          <label className="sr-only">Fecha del evento</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
            placeholder="Fecha del evento"
          />
        </div>

        <label className="sr-only">Su mensaje</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="form-input h-40 mb-6"
          placeholder="Su mensaje"
        />

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Mandar
          </button>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default LibroDeReclamaciones;
