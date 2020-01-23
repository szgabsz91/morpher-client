import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  let props;

  beforeEach(() => {
    props = {
      onLanguageSelected: jest.fn()
    };
  });

  test('should display the language change text', () => {
    const { queryByTestId } = render(
      <LanguageSelector {...props} />
    );

    const languageChangeText = queryByTestId('language-change-text');
    expect(languageChangeText).toBeTruthy();
    expect(languageChangeText.props.children).toBe('LanguageChangeText');
    expect(languageChangeText.props.style[2]).toBeUndefined();
  });

  test('should display the language change text with extra style if it is provided', () => {
    props = {
      ...props,
      style: {
        backgroundColor: 'red'
      }
    };

    const { queryByTestId } = render(
      <LanguageSelector {...props} />
    );

    const languageChangeText = queryByTestId('language-change-text');
    expect(languageChangeText).toBeTruthy();
    expect(languageChangeText.props.style[2]).toBe(props.style);
  });

  test('should display two flags', () => {
    const { queryAllByTestId } = render(
      <LanguageSelector {...props} />
    );

    const flags = queryAllByTestId('flag-button');
    expect(flags).toBeTruthy();
    expect(flags.length).toBe(2);
  });

  test('should invoke the onLanguageSelector prop if a flag is pressed', () => {
    const { queryAllByTestId } = render(
      <LanguageSelector {...props} />
    );

    const flagButtonEn = queryAllByTestId('flag-button')[0];
    expect(flagButtonEn).toBeTruthy();
    fireEvent.press(flagButtonEn);

    expect(props.onLanguageSelected).toHaveBeenCalledWith('en');
  });
});
