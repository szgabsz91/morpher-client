import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import Flag from './Flag';
import { initialWindowMetrics } from '../../../../testing/initialWindowMetrics';

describe('Flag', () => {
  let props;

  beforeEach(() => {
    props = {
      flagImage: 1,
      style: {
        margin: 10
      },
      onLanguageSelected: jest.fn()
    };
  });

  test('should display the Button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <Flag {...props} />
      </NativeBaseProvider>
    );

    const button = queryByTestId('flag-button');
    expect(button).toBeTruthy();
  });

  test('should invoke the provided callback if the IconButton is clicked', () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <Flag {...props} />
      </NativeBaseProvider>
    );

    const button = getByTestId('flag-button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(props.onLanguageSelected).toBeCalled();
  });

  test('should display the image', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <Flag {...props} />
      </NativeBaseProvider>
    );

    const image = queryByTestId('flag-image');
    expect(image).toBeTruthy();
    expect(image.props.source).toBe(props.flagImage);
  });
});
