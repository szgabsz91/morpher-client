import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import ApiUrlEditor from './ApiUrlEditor';
import { initialWindowMetrics } from '../../../../testing/initialWindowMetrics';

jest.useFakeTimers();

describe('ApiUrlEditor', () => {
  let props;

  beforeEach(() => {
    props = {
      currentApiUrl: 'http://localhost:8080',
      onCommit: jest.fn()
    };
  });

  test('should display the API URL editor text', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const apiUrlEditorText = queryByTestId('api-url-editor-text');
    expect(apiUrlEditorText).toBeTruthy();
    expect(apiUrlEditorText.props.children).toBe('ApiUrlEditorText');
  });

  test('should display the API URL input', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    expect(apiUrlInput.props.autoCapitalize).toBe('none');
    expect(apiUrlInput.props.autoCorrect).toBeFalsy();
    expect(apiUrlInput.props.value).toBe(props.currentApiUrl);
  });

  test('should display an error icon if the API URL is empty', () => {
    props = {
      ...props,
      currentApiUrl: ''
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const apiUrlInput = queryByTestId('api-url-input-error');
    expect(apiUrlInput).toBeTruthy();
  });

  test('should display the save icon', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const saveIconButton = queryByTestId('save-icon-button');
    expect(saveIconButton).toBeTruthy();
  });

  test('should invoke the onCommit prop if the save button is pressed, the API URL is not empty and not equal to the currently saved API URL', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    const newApiUrl = 'new-api-url';
    fireEvent.changeText(apiUrlInput, newApiUrl);

    const saveButton = queryByTestId('save-icon-button');
    expect(saveButton).toBeTruthy();
    fireEvent.press(saveButton);

    expect(props.onCommit).toHaveBeenCalledWith(newApiUrl);
  });

  test('should display the cancel icon button', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    const cancelIconButton = queryByTestId('cancel-icon-button');
    expect(cancelIconButton).toBeTruthy();
  });

  test('should reset the API URL if the cancel button is pressed', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <ApiUrlEditor {...props} />
      </NativeBaseProvider>
    );

    let apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    const newApiUrl = 'new-api-url';
    fireEvent.changeText(apiUrlInput, newApiUrl);

    const cancelButton = queryByTestId('cancel-icon-button');
    expect(cancelButton).toBeTruthy();
    fireEvent.press(cancelButton);

    apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    expect(apiUrlInput.props.value).toBe(props.currentApiUrl);
  });
});
