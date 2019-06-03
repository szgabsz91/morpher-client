import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import setupInternationalization from '@szgabsz91/morpher-client-shared/src/i18n';

i18n.use(initReactI18next);

setupInternationalization(i18n);

export default i18n;