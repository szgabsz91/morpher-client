import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import InflectionGenerationPageDrawerIcon from './InflectionGenerationPageDrawerIcon';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('InflectionGenerationPageDrawerIcon', () => {
  let props;

  beforeEach(() => {
    props = {
      color: 'red'
    };
  });

  test('should display the icon with the given color', () => {
    const { UNSAFE_queryByType } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <InflectionGenerationPageDrawerIcon {...props} />
      </NativeBaseProvider>
    );

    const icon = UNSAFE_queryByType(Text);
    expect(icon).toBeTruthy();
  });
});
