import i18n from 'i18next';
import backend from 'i18next-http-backend';
import LangugeDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
const path = require('path');

const PATHS = {
  src: path.join(__dirname, '../src'), // absolute path to RepoDir/src
  dist: path.join(__dirname, '../dist') // absolute path to RepoDir/dist
};

i18n
  .use(backend)
  .use(LangugeDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
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
