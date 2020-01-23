import React from 'react';
import { render } from '@testing-library/react-native';

import MorphologicalAnalysisPageTitle from './MorphologicalAnalysisPageTitle';

describe('MorphologicalAnalysisPageTitle', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  test('should display the title', () => {
    const { queryByTestId } = render(
      <MorphologicalAnalysisPageTitle />
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
      <MorphologicalAnalysisPageTitle {...props} />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.style[1].color).toBe(props.color);
  });
});
