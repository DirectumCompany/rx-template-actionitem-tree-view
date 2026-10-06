import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import localesEN from './locales/common.en.json';
import localesRU from './locales/common.ru.json';

const resources = {
  en: {
    translation: localesEN
  },
  ru: {
    translation: localesRU
  }
};

let i18nInstance;

if (!i18nInstance) {
  i18nInstance = i18n
    .createInstance()
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      debug: process.env.NODE_ENV !== 'production',
      fallbackLng: 'en',
      supportedLngs: ['en', 'ru', 'en-US', 'ru-RU'],
      initImmediate: false
    });
}

export default i18nInstance;
