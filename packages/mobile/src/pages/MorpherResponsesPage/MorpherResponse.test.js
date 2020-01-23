import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import MorpherResponse from './MorpherResponse';

import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

console.log('XXX', inflectionResponse);

describe('MorpherResponse', () => {
  let props;

  beforeEach(() => {
    props = {
      response: inflectionResponse,
      onResponseSelected: jest.fn()
    };
  });

  test('should display the sample', () => {
    const { queryByTestId } = render(
      <MorpherResponse {...props} />
    );

    const header = queryByTestId('header');
    expect(header).toBeTruthy();
    expect(header.props.children).toBe('affixTypes:Sample');
  });

  test('should not display the number of affix types in case of inflection generation', () => {
    const { queryByTestId } = render(
      <MorpherResponse {...props} />
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
      <MorpherResponse {...props} />
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeTruthy();
    expect(subheader.props.children).toBe('AffixTypes');
  });

  test('should display a progress bar with the aggregated weight', () => {
    const { queryByTestId } = render(
      <MorpherResponse {...props} />
    );

    const progressBar = queryByTestId('progress-bar');
    expect(progressBar).toBeTruthy();
    expect(progressBar.props.style[0].width).toBeNull();
    expect(progressBar.props.progress).toBe(props.response.aggregatedWeight);
  });

  test('should display a forward icon', () => {
    const { queryByTestId } = render(
      <MorpherResponse {...props} />
    );

    const arrowIcon = queryByTestId('arrow-icon');
    expect(arrowIcon).toBeTruthy();
  });

  test('should invoke the onResponseSelected prop if the response row is pressed', () => {
    const { queryByTestId } = render(
      <MorpherResponse {...props} />
    );

    const listItem = queryByTestId('list-item');
    expect(listItem).toBeTruthy();
    fireEvent.press(listItem);

    expect(props.onResponseSelected).toBeCalled();
  });
});
