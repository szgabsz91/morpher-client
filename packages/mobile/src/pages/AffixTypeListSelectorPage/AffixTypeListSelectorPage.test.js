import React from 'react';
import { act, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import AffixTypeListSelectorPage, { AllAffixTypes, SelectedAffixTypes } from './AffixTypeListSelectorPage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { getSupportedAffixTypes } from '@szg/morpher-client-shared';

jest.mock('react-native-tab-view', () => {
  const { useEffect } = require('react');
  const { Text } = require('react-native');
  return {
    SceneMap: () => '',
    TabView: (props) => {
      useEffect(() => {
        // eslint-disable-next-line react/prop-types
        props.onIndexChange(1);
        // eslint-disable-next-line react/prop-types
        props.navigationState.routes[0].onSelectedAffixTypesChanged(['AFF1', 'AFF2']);
      }, []);
      return (
        <Text testID="tabview-props">{JSON.stringify(props)}</Text>
      )
    }
  };
});

jest.mock('@szg/morpher-client-shared');

describe('AffixTypeListSelectorPage', () => {
  let props;
  let supportedAffixTypes;
  let supportedAffixTypesPromise;

  beforeEach(() => {
    props = {
      navigation: {
        setOptions: jest.fn(({ headerRight }) => headerRight()),
        setParams: jest.fn()
      },
      route: {
        params: {
          selectedAffixTypes: ['AFF1']
        }
      }
    };

    supportedAffixTypes = ['AFF1', 'AFF2', 'AFF3'];
    supportedAffixTypesPromise = Promise.resolve(supportedAffixTypes);
    getSupportedAffixTypes.mockResolvedValue(supportedAffixTypesPromise);
  });

  test('should set the navigation options', async () => {
    render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    expect(props.navigation.setOptions).toHaveBeenCalledTimes(1);
  });

  test('should set the navigation params', async () => {
    render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    expect(props.navigation.setParams).toHaveBeenCalledTimes(1);
    expect(props.navigation.setParams).toHaveBeenCalledWith({
      selectedAffixTypes: ['AFF1', 'AFF2']
    });
  });

  test('should display the tabview', async () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPage {...props} />
    );
    await act(() => supportedAffixTypesPromise);

    const tabviewProps = queryByTestId('tabview-props');
    expect(tabviewProps.props.children).toBe(JSON.stringify({
      navigationState: {
        index: 1,
        routes: [
          {
            key: 'all',
            title: 'tabs.All',
            affixTypes: ['AFF1', 'AFF2', 'AFF3'],
            selectedAffixTypes: ['AFF1']
          },
          {
            key: 'selected',
            title: 'tabs.Selected',
            affixTypes: ['AFF1', 'AFF2', 'AFF3'],
            selectedAffixTypes: ['AFF1']
          }
        ]
      },
      renderScene: '',
      style: {
        marginTop: null
      },
      initialLayout: {
        width: 750
      },
      testID: 'tabview'
    }));
  });

  describe('AllAffixTypes', () => {
    let props;

    beforeEach(() => {
      props = {
        route: {
          affixTypes: ['AFF1', 'AFF2'],
          selectedAffixTypes: ['AFF1'],
          onSelectedAffixTypesChanged: jest.fn()
        }
      };
    });

    test('should display the affix type list', () => {
      const { queryAllByTestId } = render(
        <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
          <AllAffixTypes {...props} />
        </NativeBaseProvider>
      );

      const headers = queryAllByTestId('header').map(header => header.props.children);
      expect(headers).toEqual(['AFF1.DisplayName', 'AFF2.DisplayName']);
    });
  });

  describe('SelectedAffixTypes', () => {
    let props;

    beforeEach(() => {
      props = {
        route: {
          affixTypes: ['AFF1', 'AFF2'],
          selectedAffixTypes: ['AFF1'],
          onSelectedAffixTypesChanged: jest.fn()
        }
      };
    });

    test('should display the affix type list', () => {
      const { queryAllByTestId } = render(
        <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
          <SelectedAffixTypes {...props} />
        </NativeBaseProvider>
      );

      const headers = queryAllByTestId('header').map(header => header.props.children);
      expect(headers).toEqual(['AFF1.DisplayName']);
    });
  });
});
