import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hi from './locales/lnHi.json';
import En from './locales/lnEn.json';
import Gu from './locales/lnGu.json';

i18n.use(initReactI18next).init({
    resources: {
        hi: {
            translation: hi,
        },
        en: {
            translation: En,
        },
        gu: {
            translation: Gu,
        },
    },
    lng: 'hi',
    fallbackLng: 'hi',
    debug: false,
    interpolation: {
        escapeValue: true,
    },
});
export default i18n;