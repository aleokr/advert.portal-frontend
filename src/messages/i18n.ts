import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import login_pl from "./login_pl.json"
import login_en from "./login_en.json"
import register_pl from "./register_pl.json"
import register_en from "./register_en.json"

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({

        resources: {
            en: {
                translations: {
                    login: login_en,
                    register: register_en
                }
            },
            pl: {
                translations: {
                    login: login_pl,
                    register: register_pl
                }
            }
        },
        lng: 'pl',
        fallbackLng: 'en',
        debug: true,
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;