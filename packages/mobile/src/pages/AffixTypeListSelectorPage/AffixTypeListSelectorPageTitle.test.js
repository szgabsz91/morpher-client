import React from 'react';
import { render } from '@testing-library/react-native';

import AffixTypeListSelectorPageTitle from './AffixTypeListSelectorPageTitle';

describe('AffixTypeListSelectorPageTitle', () => {
  test('should display the title', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelectorPageTitle />
    );

    const title = queryByTestId('title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Title');
  });
});
