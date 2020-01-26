import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

import SettingsPage from './SettingsPage';

jest.useFakeTimers();

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
      <SettingsPage />
    );

    const apiUrlEditorText = queryByTestId('api-url-editor-text');
    expect(apiUrlEditorText).toBeTruthy();
  });

  test('should save the API URL in AsyncStorage if the onCommit handler is invoked', async () => {
    const setItemResultPromise = Promise.resolve();
    AsyncStorage.setItem.mockReturnValue(setItemResultPromise);

    const { queryByTestId } = render(
      <SettingsPage />
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
      <SettingsPage />
    );

    const languageChangeText = queryByTestId('language-change-text');
    expect(languageChangeText).toBeTruthy();
  });

  test('should change the language if the onLanguageSelected handler is invoked', () => {
    const setItemResultPromise = Promise.resolve();
    AsyncStorage.setItem.mockReturnValue(setItemResultPromise);

    const { queryAllByTestId } = render(
      <SettingsPage />
    );

    const flagButtonEn = queryAllByTestId('flag-button')[0];
    expect(flagButtonEn).toBeTruthy();
    fireEvent.press(flagButtonEn);

    expect(changeLanguage).toHaveBeenCalledWith('en');
  });

  describe('navigationOptions', () => {
    let props;
    let navigationOptions;

    beforeEach(() => {
      props = {
        navigation: {
          toggleDrawer: jest.fn()
        }
      };
      navigationOptions = SettingsPage.navigationOptions(props);
    });

    describe('headerTitle', () => {
      it('should render the title of the page', () => {
        const HeaderTitle = navigationOptions.headerTitle;

        const { queryByTestId } = render(
          <HeaderTitle />
        );

        const title = queryByTestId('title');
        expect(title).toBeTruthy();
      });
    });

    describe('headerLeft', () => {
      it('should render the menu icon button', () => {
        const HeaderLeft = navigationOptions.headerLeft;

        const { queryByTestId } = render(
          <HeaderLeft />
        );

        const button = queryByTestId('button');
        expect(button).toBeTruthy();
        fireEvent.press(button);

        expect(props.navigation.toggleDrawer).toHaveBeenCalled();
      });
    });
  });
});
