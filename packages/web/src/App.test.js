import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('should render the AppBar', () => {
    const { queryByTestId } = render(<App />);
    
    expect(queryByTestId('app-bar')).toBeTruthy();
  });

  test('should render the Drawer', () => {
    const { queryByTestId } = render(<App />);
    
    expect(queryByTestId('drawer')).toBeTruthy();
  });

  test('should render the main section', () => {
    const { queryByTestId } = render(<App />);
    
    expect(queryByTestId('main')).toBeTruthy();
  });
});
