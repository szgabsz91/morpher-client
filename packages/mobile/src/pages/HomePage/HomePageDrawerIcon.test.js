import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import HomePageDrawerIcon from './HomePageDrawerIcon';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('HomePageDrawerIcon', () => {
  let props;

  beforeEach(() => {
    props = {
      color: 'red'
    };
  });

  test('should display the icon with the given color', () => {
    const { UNSAFE_queryByType } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <HomePageDrawerIcon {...props} />
      </NativeBaseProvider>
    );

    const icon = UNSAFE_queryByType(Text);
    expect(icon).toBeTruthy();
  });
});
