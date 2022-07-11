import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import LanguageSelector from './LanguageSelector';
import { initialWindowMetrics } from '../../../../testing/initialWindowMetrics';

jest.mock('../../../../../assets/flags/en.png', () => 1);
jest.mock('../../../../../assets/flags/hu.png', () => 2);

describe('LanguageSelector', () => {
  let props;

  beforeEach(() => {
    props = {
      onLanguageSelected: jest.fn()
    };
  });

  test('should display the language change text', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <LanguageSelector {...props} />
      </NativeBaseProvider>
    );

    const languageChangeText = queryByTestId('language-change-text');
    expect(languageChangeText).toBeTruthy();
    expect(languageChangeText.props.children).toBe('LanguageChangeText');
  });

  test('should display two flags', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <LanguageSelector {...props} />
      </NativeBaseProvider>
    );

    const flags = queryAllByTestId('flag-button');
    expect(flags).toBeTruthy();
    expect(flags.length).toBe(2);
  });

  test('should invoke the onLanguageSelector prop if a flag is pressed', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <LanguageSelector {...props} />
      </NativeBaseProvider>
    );

    const flagButtonEn = queryAllByTestId('flag-button')[0];
    expect(flagButtonEn).toBeTruthy();
    fireEvent.press(flagButtonEn);

    expect(props.onLanguageSelected).toHaveBeenCalledWith('en');
  });
});
