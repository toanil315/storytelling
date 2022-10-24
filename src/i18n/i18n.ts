import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import vi from "./locales/vi/translation.json";
import en from "./locales/en/translation.json";

export const defaultNS = "en";
export const resources = {
  en: { translation: en },
  vi: { translation: vi },
} as const;

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources,
  });

export default i18next;
