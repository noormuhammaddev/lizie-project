import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

const ContactForm = ({ onSubmit, fields }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Call the onSubmit function passed as a prop
    onSubmit({ name, phone, message, code });

    // Configure emailjs with your email service provider credentials
    emailjs.init("Y5uCKe5ZOeBFm81-b");

    // Prepare the email template parameters
    const templateParams = {
      from_name: name,
      phone,
      message,
      code,
    };

    // Send the email using emailjs
    emailjs
      .send("service_pzf37dj", "template_2cv436u", templateParams)
      .then((response) => {
        console.log("Email sent successfully!", response.text);
        // Reset the form fields after successful submission
        setName("");
        setPhone("");
        setMessage("");
        setCode("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Handle any errors that occur during email sending
      });
    toast.success("Message sent to manager's Mail");
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-4">
          <label className="sr-only">{t("form_name")}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
            placeholder={t("form_name")}
          />

          <label className="sr-only">{t("form_phnumber")}</label>
          <input
            type="tel"
            onKeyDown={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
            placeholder={t("form_phnumber")}
          />
        </div>

        {fields.showMessageField && (
          <div className="mb-4">
            <label className="sr-only">{t("form_message")}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="form-input h-40"
              placeholder={t("form_message")}
            />
          </div>
        )}

        {fields.showCodeField && (
          <div className="mb-4">
            <label className="sr-only">{t("form_code")}</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="form-input"
              placeholder={t("form_code")}
            />
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            {fields.buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
