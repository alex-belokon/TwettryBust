import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uaTranslations from "./location/uaTranslations";
import enTranslations from "./location/enTranslations";

const translations = {
  uk: uaTranslations,
  en: enTranslations,
};

const initI18n = async () => {
  await i18n.use(initReactI18next).use(LanguageDetector).init({
    fallbackLng: "en",
    debug: false,
    resources: translations,
  });
};

export default initI18n().then(() => i18n);
