import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { when } from 'jest-when';

import AffixTypeListSelectorPageHeaderRightIcon from './AffixTypeListSelectorPageHeaderRightIcon';

describe('AffixTypeListSelectorPageHeaderRightIcon', () => {
  let props = {
    navigation: {
      getParam: jest.fn(),
      goBack: jest.fn()
    }
  };

  test('should display the button', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPageHeaderRightIcon {...props} />
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    expect(button.props.style.backgroundColor).toBe('transparent');
  });

  test('should invoke onReceiveAffixTypeList and navigation.goBack if the button is pressed', () => {
    const selectedAffixTypes = ['AFF1', 'AFF2'];
    when(props.navigation.getParam)
      .calledWith('selectedAffixTypes')
      .mockReturnValue(selectedAffixTypes);

    const onReceiveAffixTypeList = jest.fn();
    when(props.navigation.getParam)
      .calledWith('onReceiveAffixTypeList')
      .mockReturnValue(onReceiveAffixTypeList);

    const { queryByTestId } = render(
      <AffixTypeListSelectorPageHeaderRightIcon {...props} />
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(onReceiveAffixTypeList).toBeCalledWith(selectedAffixTypes);
    expect(props.navigation.goBack).toBeCalled();
  });

  test('should display the icon', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPageHeaderRightIcon {...props} />
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeTruthy();
    expect(icon.props.type).toBe('MaterialIcons');
  });
});
