import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SettingsPage from './SettingsPage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

jest.mock('../../../assets/flags/en.png', () => 1);
jest.mock('../../../assets/flags/hu.png', () => 2);

jest.mock('react-i18next');

describe('SettingsPage', () => {
  let changeLanguage;

  beforeEach(() => {
    changeLanguage = jest.fn();
    useTranslation.mockReturnValue([
      translationKey => translationKey,
      {
        changeLanguage
      }
    ]);
  });

  test('should display the API URL editor', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPage />
      </NativeBaseProvider>
    );

    const apiUrlEditorText = queryByTestId('api-url-editor-text');
    expect(apiUrlEditorText).toBeTruthy();
  });

  test('should save the API URL in AsyncStorage if the onCommit handler is invoked', async () => {
    const setItemResultPromise = Promise.resolve();
    AsyncStorage.setItem.mockReturnValue(setItemResultPromise);

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPage />
      </NativeBaseProvider>
    );

    const apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    const newApiUrl = 'new-api-url';
    fireEvent.changeText(apiUrlInput, newApiUrl);

    const saveButton = queryByTestId('save-icon-button');
    expect(saveButton).toBeTruthy();
    fireEvent.press(saveButton);
    await act(() => setItemResultPromise);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('apiUrl', newApiUrl);
  });

  test('should display the language selector', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPage />
      </NativeBaseProvider>
    );

    const languageChangeText = queryByTestId('language-change-text');
    expect(languageChangeText).toBeTruthy();
  });

  test('should change the language if the onLanguageSelected handler is invoked', () => {
    const setItemResultPromise = Promise.resolve();
    AsyncStorage.setItem.mockReturnValue(setItemResultPromise);

    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPage />
      </NativeBaseProvider>
    );

    const flagButtonEn = queryAllByTestId('flag-button')[0];
    expect(flagButtonEn).toBeTruthy();
    fireEvent.press(flagButtonEn);

    expect(changeLanguage).toHaveBeenCalledWith('en');
  });
});
