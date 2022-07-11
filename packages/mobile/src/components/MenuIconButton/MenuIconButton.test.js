import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MenuIconButton from './MenuIconButton';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('MenuIconButton', () => {
  let props;

  beforeEach(() => {
    props = {
      onButtonPressed: jest.fn()
    };
  });

  test('should display the button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MenuIconButton {...props} />
      </NativeBaseProvider>
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
  });

  test('should invoke the onButtonPressed prop if the button is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MenuIconButton {...props} />
      </NativeBaseProvider>
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(props.onButtonPressed).toBeCalled();
  });

  test('should display the icon', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MenuIconButton {...props} />
      </NativeBaseProvider>
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.type).toBe('MaterialIcons');
    expect(icon.props.name).toBe('menu');
  });
});
