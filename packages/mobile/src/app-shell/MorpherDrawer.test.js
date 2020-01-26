import React from 'react';
import { render } from '@testing-library/react-native';

import MorpherDrawer from './MorpherDrawer';

jest.mock('react-navigation-drawer', () => {
  const { Text } = require('native-base');
  return {
    DrawerItems: props => (
      <Text testID="props-text">{JSON.stringify(props, null, 2)}</Text>
    )
  };
});

describe('MorpherDrawer', () => {
  let props;

  beforeEach(() => {
    props = {
      foo: 'bar'
    };
  });

  test('should display the logo', () => {
    const { queryByTestId } = render(
      <MorpherDrawer {...props} />
    );

    const logoImage = queryByTestId('logo-image');
    expect(logoImage).toBeTruthy();
    expect(logoImage.props.source.testUri).toContain('morpher.png');
  });

  test('should display the drawer items using the provided props', () => {
    const { queryByTestId } = render(
      <MorpherDrawer {...props} />
    );

    const propsText = queryByTestId('props-text');
    expect(propsText).toBeTruthy();

    const propsObject = JSON.parse(propsText.props.children);
    expect(propsObject.foo).toBe(props.foo);
  });
});
