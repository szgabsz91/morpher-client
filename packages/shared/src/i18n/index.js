import en from './en.json';
import hu from './hu.json';

export default function setupInternationalization(i18n) {
  i18n.init({
    whitelist: ['en', 'hu'],
    fallbackLng: 'en',
    lng: 'en',

    resources: {
      en,
      hu
    },

    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });

  return i18n;
};
