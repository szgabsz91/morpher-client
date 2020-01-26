import React from 'react';
import { render } from '@testing-library/react-native';

import InflectionGenerationPageDrawerIcon from './InflectionGenerationPageDrawerIcon';

describe('InflectionGenerationPageDrawerIcon', () => {
  let props;

  beforeEach(() => {
    props = {
      color: 'red'
    };
  });

  test('should display the icon with the given color', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPageDrawerIcon {...props} />
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.type).toBe('MaterialIcons');

    const styleObjectsWithColor = icon.props.style[1].filter(s => s.color);
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).toBe(props.color);
  });
});
