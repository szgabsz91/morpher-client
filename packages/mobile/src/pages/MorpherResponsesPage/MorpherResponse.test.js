import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import MorpherResponse from './MorpherResponse';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

describe('MorpherResponse', () => {
  let props;

  beforeEach(() => {
    props = {
      response: inflectionResponse,
      isLastResponse: false,
      onResponseSelected: jest.fn()
    };
  });

  test('should display the sample', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const header = queryByTestId('header');
    expect(header).toBeTruthy();
    expect(header.props.children).toBe('affixTypes:Sample');
  });

  test('should not display the number of affix types in case of inflection generation', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeNull();
  });

  test('should display the number of affix types in case of morphological analysis', () => {
    props = {
      ...props,
      response: analysisResponse
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeTruthy();
    expect(subheader.props.children).toBe('AffixTypes');
  });

  test('should display a progress bar with the aggregated weight', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const progressBar = queryByTestId('progress-bar');
    expect(progressBar).toBeTruthy();
    expect(progressBar.props.accessibilityValue.now).toBe(100 * props.response.aggregatedWeight);
  });

  test('should display a forward icon', () => {
    const { UNSAFE_queryAllByType } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const arrowIcon = UNSAFE_queryAllByType(Text).find(text => text.props.children === undefined);
    expect(arrowIcon).toBeTruthy();
  });

  test('should invoke the onResponseSelected prop if the response row is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponse {...props} />
      </NativeBaseProvider>
    );

    const listItem = queryByTestId('list-item');
    expect(listItem).toBeTruthy();
    fireEvent.press(listItem);

    expect(props.onResponseSelected).toBeCalled();
  });
});
