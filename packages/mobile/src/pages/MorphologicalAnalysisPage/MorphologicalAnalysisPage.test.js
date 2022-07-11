import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import MorphologicalAnalysisPage from './MorphologicalAnalysisPage';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

import { analyze, analysisResponse } from '@szg/morpher-client-shared';

jest.mock('@szg/morpher-client-shared');

describe('MorphologicalAnalysisPage', () => {
  let props;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };
  });

  test('should display the text input', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorphologicalAnalysisPage {...props} />
      </NativeBaseProvider>
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    expect(lemmaInput.props.autoCapitalize).toBe('none');
    expect(lemmaInput.props.autoCorrect).toBeFalsy();
    expect(lemmaInput.props.value).toBe('');
  });

  test('should display the submit button text', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorphologicalAnalysisPage {...props} />
      </NativeBaseProvider>
    );

    const submitButtonText = queryByTestId('submit-button-text');
    expect(submitButtonText).toBeTruthy();
    expect(submitButtonText.props.children).toBe('button.Label');
  });

  test('should navigate to the responses page after the analysis', async () => {
    const responses = [analysisResponse];
    const responsesPromise = Promise.resolve(responses);
    analyze.mockResolvedValue(responsesPromise);

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <MorphologicalAnalysisPage {...props} />
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
