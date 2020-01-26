import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';

import { setupInternationalization } from '@szg/morpher-client-shared';

setupInternationalization(i18n, initReactI18next, i18nextReactNative);
