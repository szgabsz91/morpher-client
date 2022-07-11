import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import InflectionGenerationPage from './InflectionGenerationPage';

import { inflect, inflectionResponse } from '@szg/morpher-client-shared';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

jest.mock('@szg/morpher-client-shared');

jest.mock('../AffixTypeListSelectorPage/AffixTypeListSelector', () => {
  const { useEffect } = require('react');
  const { Text } = require('react-native');

  // eslint-disable-next-line react/prop-types
  return function MockAffixTypeListSelector({ name, handleChange }) {
    useEffect(() => {
      handleChange({
        target: {
          id: name,
          value: ['AFF1', 'AFF2'],
        }
      });
    }, []);

    return <Text testID="mock-affix-type-list-selector">{name}</Text>;
  }
});

describe('InflectionGenerationPage', () => {
  const newlySelectedAffixTypes = ['<PLUR>'];
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn((routeName, params) => {
          if (params.onReceiveAffixTypeList) {
            params.onReceiveAffixTypeList(newlySelectedAffixTypes);
          }
        })
      }
    };
  });

  test('should display the text input', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <InflectionGenerationPage {...props} />
      </NativeBaseProvider>
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    expect(lemmaInput.props.autoCapitalize).toBe('none');
    expect(lemmaInput.props.autoCorrect).toBeFalsy();
    expect(lemmaInput.props.value).toBe('');
  });

  test('should display the affix type list selector', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <InflectionGenerationPage {...props} />
      </NativeBaseProvider>
    );

    const mockAffixTypeListSelector = queryByTestId('mock-affix-type-list-selector');
    expect(mockAffixTypeListSelector).toBeTruthy();
  });

  test('should display the submit button text', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <InflectionGenerationPage {...props} />
      </NativeBaseProvider>
    );

    const submitButtonText = queryByTestId('submit-button-text');
    expect(submitButtonText).toBeTruthy();
    expect(submitButtonText.props.children).toBe('button.Label');
  });

  test('should navigate to the responses page after the inflection', async () => {
    const responses = [inflectionResponse];
    const responsesPromise = Promise.resolve(responses);
    inflect.mockResolvedValue(responsesPromise);

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <InflectionGenerationPage {...props} />
      </NativeBaseProvider>
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    fireEvent.changeText(lemmaInput, 'alma');

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);

    await act(() => responsesPromise);

    expect(props.navigation.navigate).toHaveBeenCalledWith('MorpherResponses', {
      responses
    });
  });
});
