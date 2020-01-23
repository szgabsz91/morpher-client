import React from 'react';
import { render } from '@testing-library/react-native';

import MorpherResponsePageTitle from './MorpherResponsePageTitle';

describe('MorpherResponsePageTitle', () => {
  test('should display the title', () => {
    const { queryByTestId } = render(
      <MorpherResponsePageTitle />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
  });
});
