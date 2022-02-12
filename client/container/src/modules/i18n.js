import i18n from 'i18next';
import backend from 'i18next-http-backend';
import LangugeDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(backend)
  .use(LangugeDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    backend: {
      loadPath:`/static/locales/{{lng}}/translation.json`
    },
    load: 'unspecific'
  });

export default i18n;