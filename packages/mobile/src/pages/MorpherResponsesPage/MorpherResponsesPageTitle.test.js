import React from 'react';
import { render } from '@testing-library/react-native';

import MorpherResponsesPageTitle from './MorpherResponsesPageTitle';

describe('MorpherResponsesPageTitle', () => {
  test('should display the title', () => {
    const { queryByTestId } = render(
      <MorpherResponsesPageTitle />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
  });
});
