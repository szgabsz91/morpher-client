import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Flag from './Flag';

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
      <Flag {...props} />
    );

    const button = queryByTestId('flag-button');
    expect(button).toBeTruthy();
    expect(button.props.style.backgroundColor).toBe('transparent');
    expect(button.props.style.margin).toBe(props.style.margin);
  });

  test('should invoke the provided callback if the IconButton is clicked', () => {
    const { getByTestId } = render(
      <Flag {...props} />
    );

    const button = getByTestId('flag-button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(props.onLanguageSelected).toBeCalled();
  });

  test('should display the image', () => {
    const { queryByTestId } = render(
      <Flag {...props} />
    );

    const image = queryByTestId('flag-image');
    expect(image).toBeTruthy();
    expect(image.props.source).toBe(props.flagImage);
  });
});
