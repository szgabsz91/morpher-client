import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MorpherResponsesPage from './MorpherResponsesPage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

describe('MorpherResponsesPage', () => {
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      },
      route: {
        params: {
          responses: [inflectionResponse, analysisResponse]
        }
      }
    };
  });

  test('should display the list of responses', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponsesPage {...props} />
      </NativeBaseProvider>
    );

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(1);
    expect(subheaders[0].props.children).toBe('AffixTypes');
  });

  test('should invoke onResponseSelected if a response is selected', () => {
    const { queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorpherResponsesPage {...props} />
      </NativeBaseProvider>
    );

    const listItems = queryAllByTestId('list-item');
    expect(listItems).toBeTruthy();

    const analysisListItem = listItems[1];
    expect(analysisListItem).toBeTruthy();
    fireEvent.press(analysisListItem);

    expect(props.navigation.navigate).toBeCalledWith('MorpherResponse', {
      response: analysisResponse
    });
  });
});
