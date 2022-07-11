import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MorphologicalAnalysisPageTitle from './MorphologicalAnalysisPageTitle';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('MorphologicalAnalysisPageTitle', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  test('should display the title', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorphologicalAnalysisPageTitle />
      </NativeBaseProvider>
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
    expect(title.props.style[1].color).toBeUndefined();
  });

  test('should display the title in the given color', () => {
    props = {
      color: 'red'
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorphologicalAnalysisPageTitle {...props} />
      </NativeBaseProvider>
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.style[1].color).toBe(props.color);
  });
});
