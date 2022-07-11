import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import KeyValuePair from './KeyValuePair';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('KeyValuePair', () => {
  let props;

  beforeEach(() => {
    props = {
      header: 'Header',
      subheader: 'Subheader'
    };
  });

  test('should display the component without an extra style if none is provided', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const row = queryByTestId('row');
    expect(row).toBeTruthy();
    expect(row.props.style).toEqual([
      {
        flexDirection: 'column'
      },
      undefined
    ]);
  });

  test('should display the component with the given style if it is provided', () => {
    props = {
      ...props,
      style: {
        margin: 10
      }
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const row = queryByTestId('row');
    expect(row).toBeTruthy();
    expect(row.props.style).toEqual([
      {
        flexDirection: 'column'
      },
      props.style
    ]);
  });

  test('should display the header', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const header = queryByTestId('header');
    expect(header).toBeTruthy();
    expect(header.props.children).toBe(props.header);
  });

  test('should not display the header in bold if the isHeaderBold flag is false', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const header = queryByTestId('header');
    expect(header).toBeTruthy();

    const style = header.props.style.splice(1);
    expect(style).toEqual([[
      {
        alignSelf: 'flex-start'
      },
      false
    ]]);
  });

  test('should display the header in bold if the isHeaderBold flag is true', () => {
    props = {
      ...props,
      isHeaderBold: true
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const header = queryByTestId('header');
    expect(header).toBeTruthy();

    const style = header.props.style.splice(1);
    expect(style).toEqual([[
      {
        alignSelf: 'flex-start'
      },
      {
        fontWeight: 'bold'
      }
    ]]);
  });

  test('should display the subheader', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeTruthy();
    expect(subheader.props.children).toBe(props.subheader);
  });

  test('should not display the subheader in italic if the isSubheaderItalic flag is false', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeTruthy();

    const style = subheader.props.style.splice(1);
    expect(style).toEqual([[
      {
        alignSelf: 'flex-start',
        color: '#555'
      },
      false
    ]]);
  });

  test('should display the subheader in italic if the isSubheaderItalic flag is true', () => {
    props = {
      ...props,
      isSubheaderItalic: true
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <KeyValuePair {...props} />
      </NativeBaseProvider>
    );

    const subheader = queryByTestId('subheader');
    expect(subheader).toBeTruthy();

    const style = subheader.props.style.splice(1);
    expect(style).toEqual([[
      {
        alignSelf: 'flex-start',
        color: '#555'
      },
      {
        fontStyle: 'italic'
      }
    ]]);
  });
});
