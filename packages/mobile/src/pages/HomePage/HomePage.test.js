import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import HomePage from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    Linking.openURL = jest.fn();
  });

  test('should display the logo', () => {
    const { queryByTestId } = render(
      <HomePage />
    );

    const logoImage = queryByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source.testUri).toContain('morpher.png');
  });

  test('should display the paragraphs', () => {
    const { queryAllByTestId } = render(
      <HomePage />
    );

    const paragraphs = queryAllByTestId('paragraph').map(
      paragraph => paragraph.props.children
    );
    const expectedParagraphs = ['Paragraph1', 'Paragraph2', 'Resources'];
    expect(paragraphs).toEqual(expectedParagraphs);
  });

  test('should display the Morpher button', () => {
    const { queryByTestId } = render(
      <HomePage />
    );

    const morpherButtonText = queryByTestId('morpher-button-text');
    expect(morpherButtonText).toBeTruthy();
    expect(morpherButtonText.props.children).toBe('application:Title');
  });

  test('should open the Morpher homepage if the Morpher button is pressed', () => {
    const { queryByTestId } = render(
      <HomePage />
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
      <HomePage />
    );

    const morpherApiButtonText = queryByTestId('morpher-api-button-text');
    expect(morpherApiButtonText).toBeTruthy();
    expect(morpherApiButtonText.props.children).toBe('MorpherAPI');
  });

  test('should open the Morpher API homepage if the Morpher API button is pressed', () => {
    const { queryByTestId } = render(
      <HomePage />
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
      <HomePage />
    );

    const morpherClientButtonText = queryByTestId('morpher-client-button-text');
    expect(morpherClientButtonText).toBeTruthy();
    expect(morpherClientButtonText.props.children).toBe('MorpherClient');
  });

  test('should open the Morpher Client homepage if the Morpher Client button is pressed', () => {
    const { queryByTestId } = render(
      <HomePage />
    );

    const morpherClientButton = queryByTestId('morpher-client-button');
    expect(morpherClientButton).toBeTruthy();
    fireEvent.press(morpherClientButton);

    expect(Linking.openURL).toBeCalledWith(
      'https://github.com/szgabsz91/morpher-client'
    );
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
      navigationOptions = HomePage.navigationOptions(props);
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
