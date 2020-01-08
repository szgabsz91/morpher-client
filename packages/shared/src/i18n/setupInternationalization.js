import en from './locales/en.json';
import hu from './locales/hu.json';

export default function setupInternationalization(i18n, initReactI18next, ...plugins) {
    i18n.use(initReactI18next);
    plugins.forEach(plugin => i18n.use(plugin));

    i18n.init({
        fallbackLng: 'en',
        whitelist: ['en', 'hu'],
        nonExplicitWhitelist: true,

        resources: {
            en,
            hu
        },

        debug: 'development' === process.env.NODE_ENV,

        interpolation: {
            escapeValue: false
        }
    });
}
