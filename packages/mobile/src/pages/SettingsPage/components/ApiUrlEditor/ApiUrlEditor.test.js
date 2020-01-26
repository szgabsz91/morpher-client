import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ApiUrlEditor from './ApiUrlEditor';

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
      <ApiUrlEditor {...props} />
    );

    const apiUrlEditorText = queryByTestId('api-url-editor-text');
    expect(apiUrlEditorText).toBeTruthy();
    expect(apiUrlEditorText.props.children).toBe('ApiUrlEditorText');
  });

  test('should display the API URL input label', () => {
    const { queryAllByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const apiUrlInputLabel = queryAllByTestId('api-url-input-label')[1];
    expect(apiUrlInputLabel).toBeTruthy();
    expect(apiUrlInputLabel.props.children).toBe('apiUrl.Label');
  });

  test('should display the API URL input', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    expect(apiUrlInput.props.autoCapitalize).toBe('none');
    expect(apiUrlInput.props.autoCorrect).toBeFalsy();
    expect(apiUrlInput.props.value).toBe(props.currentApiUrl);
  });

  test('should not display a warning icon if the API URL is not an empty string', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const apiUrlWarningIcon = queryByTestId('api-url-warning-icon');
    expect(apiUrlWarningIcon).toBeNull();
  });

  test('should display a warning icon if the API URL is an empty string', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const apiUrlInput = queryByTestId('api-url-input');
    expect(apiUrlInput).toBeTruthy();
    fireEvent.changeText(apiUrlInput, '');

    const apiUrlWarningIcon = queryByTestId('api-url-warning-icon');
    expect(apiUrlWarningIcon).toBeTruthy();
    expect(apiUrlWarningIcon.props.type).toBe('MaterialIcons');
  });

  test('should display the save icon', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const saveIcon = queryByTestId('save-icon');
    expect(saveIcon).toBeTruthy();
    expect(saveIcon.props.type).toBe('MaterialIcons');
  });

  test('should invoke the onCommit prop if the save button is pressed, the API URL is not empty and not equal to the currently saved API URL', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
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

  test('should display the cancel icon', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
    );

    const cancelIcon = queryByTestId('cancel-icon');
    expect(cancelIcon).toBeTruthy();
    expect(cancelIcon.props.type).toBe('MaterialIcons');
  });

  test('should reset the API URL if the cancel button is pressed', () => {
    const { queryByTestId } = render(
      <ApiUrlEditor {...props} />
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
