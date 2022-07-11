import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import SettingsPageTitle from './SettingsPageTitle';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('SettingsPageTitle', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  test('should display the title', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPageTitle {...props} />
      </NativeBaseProvider>
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
    expect(title.props.style[1].color).toBeUndefined();
  });

  test('should display the title with the provided color', () => {
    props = {
      color: 'red'
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPageTitle {...props} />
      </NativeBaseProvider>
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
    expect(title.props.style[1].color).toBe(props.color);
  });
});
