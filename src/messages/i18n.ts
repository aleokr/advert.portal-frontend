import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import login_pl from "./login_pl.json"
import login_en from "./login_en.json"
import register_pl from "./register_pl.json"
import register_en from "./register_en.json"
import navBar_pl from "./navBar_pl.json"
import navBar_en from "./navBar_en.json"
import advertList_pl from "./advertList_pl.json"
import advertList_en from "./advertList_en.json"
import newAdvert_pl from "./newAdvert_pl.json"
import newAdvert_en from "./newAdvert_en.json"
import newCompany_pl from "./newCompany_pl.json"
import newCompany_en from "./newCompany_en.json"
import userPanel_pl from "./userPanel_pl.json"
import userPanel_en from "./userPanel_en.json"
import categories_pl from "./categories_pl.json"
import categories_en from "./categories_en.json"
import company_pl from "./company_pl.json"
import company_en from "./company_en.json"
import settings_pl from "./settings_pl.json"
import settings_en from "./settings_en.json"
import user_pl from "./user_pl.json"
import user_en from "./user_en.json"
import advertDetail_pl from "./advertDetail_pl.json"
import advertDetail_en from "./advertDetail_en.json"
import pagination_pl from "./pagination_pl.json"
import pagination_en from "./pagination_en.json"
import tag_pl from "./tag_pl.json"
import tag_en from "./tag_en.json"


i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({

        resources: {
            en: {
                translations: {
                    login: login_en,
                    register: register_en,
                    navBar: navBar_en,
                    advertList: advertList_en,
                    newAdvert: newAdvert_en,
                    newCompany: newCompany_en,
                    userPanel: userPanel_en,
                    categories: categories_en,
                    company: company_en,
                    settings: settings_en,
                    user: user_en,
                    advertDetail: advertDetail_en,
                    pagination: pagination_en,
                    tag: tag_en
                }
            },
            pl: {
                translations: {
                    login: login_pl,
                    register: register_pl,
                    navBar:navBar_pl,
                    advertList: advertList_pl,
                    newAdvert: newAdvert_pl,
                    newCompany: newCompany_pl,
                    userPanel: userPanel_pl,
                    categories: categories_pl,
                    company: company_pl,
                    settings: settings_pl,
                    user: user_pl,
                    advertDetail: advertDetail_pl,
                    pagination: pagination_pl,
                    tag: tag_pl
                }
            }
        },
        debug: true,
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;