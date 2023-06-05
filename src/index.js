import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'es', 'pt'],
    fallbackLng: "en",
    detection: {
      order: ['cookie','htmlTag','localStorage','path', 'subdomain']
    },
    caches: ['cookie'],
    backend: {
      loadPath: '/languages/locales/{{lng}}/translation.json',
    },
    react: {useSuspense: false},
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContextProvider>
);

reportWebVitals();