import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import MorpherDrawerNavigator from './MorpherDrawerNavigator';
import { initialWindowMetrics } from '../testing/initialWindowMetrics';

jest.mock('@react-navigation/elements/lib/commonjs/assets/back-icon.png', () => 1);
jest.mock('@react-navigation/elements/lib/commonjs/assets/back-icon-mask.png', () => 2);
jest.mock('@react-navigation/drawer/lib/commonjs/views/assets/toggle-drawer-icon.png', () => 3);

describe('MorpherDrawerNavigator', () => {
  test('should render the Morpher drawer navigator', () => {
    render(
      <NavigationContainer>
        <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
          <MorpherDrawerNavigator />
        </NativeBaseProvider>
      </NavigationContainer>
    );
  });
});
