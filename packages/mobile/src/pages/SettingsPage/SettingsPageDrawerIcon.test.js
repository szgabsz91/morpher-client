import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import SettingsPageDrawerIcon from './SettingsPageDrawerIcon';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('SettingsPageDrawerIcon', () => {
  let props;

  beforeEach(() => {
    props = {
      color: 'red'
    };
  });

  test('should display the icon', () => {
    const { UNSAFE_queryByType } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <SettingsPageDrawerIcon {...props} />
      </NativeBaseProvider>
    );

    const icon = UNSAFE_queryByType(Text);
    expect(icon).toBeTruthy();
  });
});
