import React from 'react';
import { render } from '@testing-library/react-native';

import BackButton from './BackButton';

jest.mock('react-navigation-stack', () => {
  const { Text } = require('native-base');

  return {
    HeaderBackButton: ({ onPress }) => {
      onPress();
      return <Text>HeaderBackButton</Text>;
    }
  };
});

describe('BackButton', () => {
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        goBack: jest.fn()
      }
    };
  });

  test('should render the HeaderBackButton component', () => {
    render(
      <BackButton {...props} />
    );

    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
