import React from 'react';
import { render } from '@testing-library/react-native';

import MorpherDrawer from './MorpherDrawer';

jest.mock('@react-navigation/drawer', () => {
  const { Text } = require('react-native');
  return {
    DrawerItemList: props => (
      <Text testID="props-text">{JSON.stringify(props)}</Text>
    )
  };
});

jest.mock('../../assets/morpher.png', () => 1);

describe('MorpherDrawer', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  test('should display the logo', () => {
    const { queryByTestId } = render(
      <MorpherDrawer {...props} />
    );

    const logoImage = queryByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source).toBe(1);
  });
});
