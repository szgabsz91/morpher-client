import React from 'react';
import { render } from '@testing-library/react-native';

import SettingsPageDrawerIcon from './SettingsPageDrawerIcon';

describe('SettingsPageDrawerIcon', () => {
  let props;

  beforeEach(() => {
    props = {
      color: 'red'
    };
  });

  test('should display the icon', () => {
    const { queryByTestId } = render(
      <SettingsPageDrawerIcon {...props} />
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.type).toBe('MaterialIcons');
    const style = icon.props.style;

    const styleObjectsWithColor = style[1].filter(s => s.color);
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).toBe(props.color);

    const styleObjectsWithFontSize = style[1].filter(s => s.fontSize);
    const fontSize = styleObjectsWithFontSize[styleObjectsWithFontSize.length - 1].fontSize;
    expect(fontSize).toBe(27);
  });
});
