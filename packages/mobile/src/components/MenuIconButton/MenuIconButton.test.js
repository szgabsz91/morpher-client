import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import MenuIconButton from './MenuIconButton';

describe('MenuIconButton', () => {
  let props;

  beforeEach(() => {
    props = {
      onButtonPressed: jest.fn()
    };
  });

  test('should display the button', () => {
    const { queryByTestId } = render(
      <MenuIconButton {...props} />
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    expect(button.props.style.backgroundColor).toBe('transparent');
  });

  test('should invoke the onButtonPressed prop if the button is pressed', () => {
    const { queryByTestId } = render(
      <MenuIconButton {...props} />
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(props.onButtonPressed).toBeCalled();
  });

  test('should display the icon', () => {
    const { queryByTestId } = render(
      <MenuIconButton {...props} />
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.type).toBe('MaterialIcons');
  });
});
