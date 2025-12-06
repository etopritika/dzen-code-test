import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ua from "./ua.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ua: { translation: ua },
  },
  lng: JSON.parse(localStorage.getItem("lang") || '"en"'),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", JSON.stringify(lng));
});

export default i18n;
