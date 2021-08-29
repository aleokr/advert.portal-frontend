import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import login_en from "./login_en.json"
import login_pl from "./login_pl.json"

i18n.use(LanguageDetector).init({

    resources: {
        en: {
            login: login_en
        },
        pl: {
            login: login_pl
        }
    },
    fallbackLng: "pl",
    debug: true
});

export default i18n;