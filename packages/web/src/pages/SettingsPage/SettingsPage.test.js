import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import SettingsPage from './SettingsPage';

jest.mock('react-i18next');

describe('SettingsPage', () => {
    const localStorageKey = 'i18nextLng';
    let changeLanguage;

    beforeEach(() => {
        localStorage.removeItem(localStorageKey);
        changeLanguage = jest.fn();
        useTranslation.mockReturnValue([
            translationKey => translationKey,
            {
                changeLanguage
            }
        ]);
    });

    test('should display the page title', () => {
        const { queryByTestId } = render(
            <SettingsPage />
        );

        const pageTitle = queryByTestId('page-title');
        expect(pageTitle).toBeTruthy();
        expect(pageTitle.textContent).toBe('Title');
    });

    test('should display the language change text', () => {
        const { queryByTestId } = render(
            <SettingsPage />
        );

        const languageChange = queryByTestId('language-change');
        expect(languageChange).toBeTruthy();
        expect(languageChange.textContent).toBe('LanguageChangeText');
    });

    test('should display the English flag and change the language to English if it is clicked', () => {
        const { getAllByTestId } = render(
            <SettingsPage />
        );

        const languageCode = 'en';
        const flagEn = getAllByTestId('icon-button')[0];
        fireEvent.click(flagEn);

        expect(changeLanguage).toBeCalledWith(languageCode);
        expect(localStorage.getItem(localStorageKey)).toBe(languageCode);
    });

    test('should display the Hungarian flag and change the language to Hungarian if it is clicked', () => {
        const { getAllByTestId } = render(
            <SettingsPage />
        );

        const languageCode = 'hu';
        const flagHu = getAllByTestId('icon-button')[1];
        fireEvent.click(flagHu);

        expect(changeLanguage).toBeCalledWith(languageCode);
        expect(localStorage.getItem(localStorageKey)).toBe(languageCode);
    });
});
