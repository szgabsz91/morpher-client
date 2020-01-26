import React from 'react';
import { useTranslation } from 'react-i18next';

import Flag from './components/Flag/Flag';

import enFlag from '@szg/morpher-client-shared/assets/flags/en.png';
import huFlag from '@szg/morpher-client-shared/assets/flags/hu.png';

const flags = {
    en: enFlag,
    hu: huFlag
};

export default function SettingsPage() {
    const [t, i18n] = useTranslation('settings');
    const supportedLanguageCodes = ['en', 'hu'];

    const changeLanguage = languageCode => {
        localStorage.setItem('i18nextLng', languageCode);
        i18n.changeLanguage(languageCode);
    };

    return (
        <>
            <h2 data-testid="page-title">{t('Title')}</h2>

            <p data-testid="language-change">{t('LanguageChangeText')}</p>

            {
                supportedLanguageCodes.map(supportedLanguageCode => (
                    <Flag
                        key={supportedLanguageCode}
                        flagImage={flags[supportedLanguageCode]}
                        languageName={t(`languages.${supportedLanguageCode}.Label`)}
                        onLanguageSelected={() => changeLanguage(supportedLanguageCode)}
                    />
                ))
            }
        </>
    );
}

SettingsPage.propTypes = {};
