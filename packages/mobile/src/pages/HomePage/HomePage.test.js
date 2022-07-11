import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import HomePage from './HomePage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('HomePage', () => {
  beforeEach(() => {
    Linking.openURL = jest.fn();
  });

  test('should display the logo', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const logoImage = queryByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source.testUri).toContain('morpher.png');
  });

  test('should display the paragraphs', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const paragraphs = queryAllByTestId('paragraph').map(
      paragraph => paragraph.props.children
    );
    const expectedParagraphs = ['Paragraph1', 'Paragraph2', 'Resources'];
    expect(paragraphs).toEqual(expectedParagraphs);
  });

  test('should display the Morpher button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherButtonText = queryByTestId('morpher-button-text');
    expect(morpherButtonText).toBeTruthy();
    expect(morpherButtonText.props.children).toBe('application:Title');
  });

  test('should open the Morpher homepage if the Morpher button is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherButton = queryByTestId('morpher-button');
    expect(morpherButton).toBeTruthy();
    fireEvent.press(morpherButton);

    expect(Linking.openURL).toBeCalledWith(
      'https://github.com/szgabsz91/morpher'
    );
  });

  test('should display the Morpher API button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherApiButtonText = queryByTestId('morpher-api-button-text');
    expect(morpherApiButtonText).toBeTruthy();
    expect(morpherApiButtonText.props.children).toBe('MorpherAPI');
  });

  test('should open the Morpher API homepage if the Morpher API button is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherApiButton = queryByTestId('morpher-api-button');
    expect(morpherApiButton).toBeTruthy();
    fireEvent.press(morpherApiButton);

    expect(Linking.openURL).toBeCalledWith(
      'https://github.com/szgabsz91/morpher-api'
    );
  });

  test('should display the Morpher Client button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherClientButtonText = queryByTestId('morpher-client-button-text');
    expect(morpherClientButtonText).toBeTruthy();
    expect(morpherClientButtonText.props.children).toBe('MorpherClient');
  });

  test('should open the Morpher Client homepage if the Morpher Client button is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePage />
      </NativeBaseProvider>
    );

    const morpherClientButton = queryByTestId('morpher-client-button');
    expect(morpherClientButton).toBeTruthy();
    fireEvent.press(morpherClientButton);

    expect(Linking.openURL).toBeCalledWith(
      'https://github.com/szgabsz91/morpher-client'
    );
  });
});
