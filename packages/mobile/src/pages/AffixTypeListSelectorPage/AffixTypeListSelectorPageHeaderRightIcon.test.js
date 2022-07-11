import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import AffixTypeListSelectorPageHeaderRightIcon from './AffixTypeListSelectorPageHeaderRightIcon';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('AffixTypeListSelectorPageHeaderRightIcon', () => {
  let props = {
    navigation: {
      goBack: jest.fn()
    },
    route: {
      params: {
        selectedAffixTypes: [],
        onReceiveAffixTypeList: jest.fn()
      }
    }
  };

  test('should display the button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelectorPageHeaderRightIcon {...props} />
      </NativeBaseProvider>
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
  });

  test('should invoke onReceiveAffixTypeList and navigation.goBack if the button is pressed', () => {
    props = {
      ...props,
      route: {
        params: {
          ...props.route.params,
          selectedAffixTypes: ['AFF1', 'AFF2']
        }
      }
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelectorPageHeaderRightIcon {...props} />
      </NativeBaseProvider>
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(props.route.params.onReceiveAffixTypeList).toBeCalledWith(props.route.params.selectedAffixTypes);
    expect(props.navigation.goBack).toBeCalled();
  });
});
