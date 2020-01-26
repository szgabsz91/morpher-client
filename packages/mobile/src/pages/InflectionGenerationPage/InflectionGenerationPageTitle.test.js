import React from 'react';
import { render } from '@testing-library/react-native';

import InflectionGenerationPageTitle from './InflectionGenerationPageTitle';

describe('InflectionGenerationPageTitle', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  test('should display the title', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPageTitle {...props} />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
    expect(title.props.style[1].color).toBeUndefined();
  });

  test('should display the title with the given color', () => {
    props = {
      color: 'red'
    };

    const { queryByTestId } = render(
      <InflectionGenerationPageTitle {...props} />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
    expect(title.props.style[1].color).toBe(props.color);
  });
});
