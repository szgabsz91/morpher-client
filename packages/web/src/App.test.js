import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  test('should render the AppBar', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
    );
    
    expect(queryByTestId('app-bar')).toBeTruthy();
  });

  test('should render the Drawer', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
    );
    
    expect(queryByTestId('drawer')).toBeTruthy();
  });

  test('should render the main section', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
    );
    
    expect(queryByTestId('main')).toBeTruthy();
  });
});
