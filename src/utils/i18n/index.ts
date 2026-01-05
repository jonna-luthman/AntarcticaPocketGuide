import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import enLang from "./locales/en/translation.json"
import esLang from "./locales/es/translation.json"

/**
 * This file initializes the internationalization framework for the application. 
 * It manages multi-language support (English and Spanish), automatic language detection,
 * and persistent storage of user preferences.
 */

/**
 * Translation files: English and Spanish
  */ 
const resources = {
  en: {
    translation: enLang,
  },
  es: {
    translation: esLang,
  },
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)

  /**
   * The engine that identifies the user's preferred language and manages Local Storage.
   * Read more: https://github.com/i18next/i18next-browser-languageDetector 
   * */ 
  .use(LanguageDetector)

/**
 * Hooks the i18n instance into the React lifecycle.
 */
  .use(initReactI18next)

  /** 
   * init i18next
   */
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
