import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { when } from 'jest-when';

import AffixTypeListSelectorPage from './AffixTypeListSelectorPage';

import { getSupportedAffixTypes } from '@szg/morpher-client-shared';

jest.mock('@szg/morpher-client-shared');

jest.mock('react-navigation-stack', () => {
  const { Text } = require('native-base');

  return {
    HeaderBackButton: ({ onPress }) => {
      onPress();
      return <Text>HeaderBackButton</Text>;
    }
  };
});

describe('AffixTypeListSelectorPage', () => {
  let props;
  let supportedAffixTypes;
  let supportedAffixTypesPromise;
  let selectedAffixTypes;

  beforeEach(() => {
    props = {
      navigation: {
        getParam: jest.fn(),
        setParams: jest.fn()
      }
    };

    supportedAffixTypes = ['AFF1', 'AFF2', 'AFF3'];
    supportedAffixTypesPromise = Promise.resolve(supportedAffixTypes);
    getSupportedAffixTypes.mockResolvedValue(supportedAffixTypesPromise);

    selectedAffixTypes = ['AFF1'];
    when(props.navigation.getParam)
      .calledWith('selectedAffixTypes', [])
      .mockReturnValue(selectedAffixTypes);
  });

  test('should display the first segment button in an active state', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const firstSegmentButton = queryByTestId('first-segment-button');
    expect(firstSegmentButton).toBeTruthy();
    expect(firstSegmentButton.props.style.backgroundColor).not.toBe(
      'transparent'
    );
    expect(
      firstSegmentButton.props.style.borderTopLeftRadius
    ).not.toBeUndefined();
  });

  test('should display the first segment button text', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const firstSegmentButtonText = queryByTestId('first-segment-button-text');
    expect(firstSegmentButtonText).toBeTruthy();
    expect(firstSegmentButtonText.props.children).toBe('tabs.All');
  });

  test('switch to the segment whose button is pressed', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const firstSegmentButton = queryByTestId('first-segment-button');
    expect(firstSegmentButton).toBeTruthy();

    const secondSegmentButton = queryByTestId('second-segment-button');
    expect(secondSegmentButton).toBeTruthy();

    fireEvent.press(secondSegmentButton);
    expect(firstSegmentButton.props.style.backgroundColor).toBe('transparent');
    expect(secondSegmentButton.props.style.backgroundColor).not.toBe(
      'transparent'
    );

    fireEvent.press(firstSegmentButton);
    expect(firstSegmentButton.props.style.backgroundColor).not.toBe(
      'transparent'
    );
    expect(secondSegmentButton.props.style.backgroundColor).toBe('transparent');
  });

  test('should display the second segment button in an inactive state', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const secondSegmentButton = queryByTestId('second-segment-button');
    expect(secondSegmentButton).toBeTruthy();
    expect(secondSegmentButton.props.style.backgroundColor).toBe('transparent');
    expect(
      secondSegmentButton.props.style.borderTopRightRadius
    ).not.toBeUndefined();
  });

  test('should display the second segment button text', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const secondSegmentButtonText = queryByTestId('second-segment-button-text');
    expect(secondSegmentButtonText).toBeTruthy();
    expect(secondSegmentButtonText.props.children).toBe('tabs.Selected');
  });

  test('should display the affix type list with all the affix types if the first segment is active', async () => {
    const { queryAllByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const headers = queryAllByTestId('header').map(
      header => header.props.children
    );
    const expectedHeaders = supportedAffixTypes.map(
      affixType => `${affixType}.DisplayName`
    );
    expect(headers).toEqual(expectedHeaders);
  });

  test('should display the affix type list with only the selected affix types if the second segment is active', async () => {
    const { queryByTestId, queryAllByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const secondSegmentButton = queryByTestId('second-segment-button');
    expect(secondSegmentButton).toBeTruthy();
    fireEvent.press(secondSegmentButton);

    const headers = queryAllByTestId('header').map(
      header => header.props.children
    );
    const expectedHeaders = selectedAffixTypes.map(
      affixType => `${affixType}.DisplayName`
    );
    expect(headers).toEqual(expectedHeaders);
  });

  describe('navigationOptions', () => {
    let navigationOptions;

    beforeEach(() => {
      props = {
        navigation: {
          goBack: jest.fn(),
          getParam: jest.fn()
        }
      };
      navigationOptions = AffixTypeListSelectorPage.navigationOptions(props);
    });

    describe('headerTitle', () => {
      it('should render the title of the page', () => {
        const HeaderTitle = navigationOptions.headerTitle;

        const { queryByTestId } = render(
          <HeaderTitle />
        );

        const title = queryByTestId('title');
        expect(title).toBeTruthy();
      });
    });

    describe('headerLeft', () => {
      it('should render the back button', () => {
        const HeaderLeft = navigationOptions.headerLeft;

        render(
          <HeaderLeft />
        );

        expect(props.navigation.goBack).toHaveBeenCalled();
      });
    });

    describe('headerRight', () => {
      it('should render the save button', () => {
        when(props.navigation.getParam)
          .calledWith('selectedAffixTypes', [])
          .mockReturnValue(['AFF1', 'AFF2']);
        when(props.navigation.getParam)
          .calledWith('onReceiveAffixTypeList')
          .mockReturnValue(jest.fn());

        const HeaderRight = navigationOptions.headerRight;

        const { queryByTestId } = render(
          <HeaderRight />
        );

        const button = queryByTestId('button');
        expect(button).toBeTruthy();
        fireEvent.press(button);

        expect(props.navigation.goBack).toHaveBeenCalled();
      });
    });
  });
});
