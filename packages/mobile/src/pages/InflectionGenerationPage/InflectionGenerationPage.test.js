import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';

import InflectionGenerationPage from './InflectionGenerationPage';

import { inflect, inflectionResponse } from '@szg/morpher-client-shared';

jest.mock('@szg/morpher-client-shared');

jest.useFakeTimers();

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

  test('should display the label of the text input', () => {
    const { queryAllByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const lemmaLabel = queryAllByTestId('lemma-label')[1];
    expect(lemmaLabel).toBeTruthy();
    expect(lemmaLabel.props.children).toBe('input.Label');
  });

  test('should display the text input', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    expect(lemmaInput.props.autoCapitalize).toBe('none');
    expect(lemmaInput.props.autoCorrect).toBeFalsy();
    expect(lemmaInput.props.value).toBe('');
  });

  test('should not display a warning icon for the text input if the lemma is provided', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    fireEvent.changeText(lemmaInput, 'x');

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());

    const lemmaWarningIcon = queryByTestId('lemma-warning-icon');
    expect(lemmaWarningIcon).toBeNull();
  });

  test('should display a warning icon for the text input if the lemma is not provided', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());

    const lemmaWarningIcon = queryByTestId('lemma-warning-icon');
    expect(lemmaWarningIcon).toBeTruthy();
  });

  test('should display the affix type list selector', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const rowContainer = queryByTestId('row-container');
    expect(rowContainer).toBeTruthy();
  });

  test('should not display a warning icon for the affix type list selector if the affix types are provided', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const editButton = queryByTestId('edit-button');
    expect(editButton).toBeTruthy();
    fireEvent.press(editButton);

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());

    const warningIcon = queryByTestId('warning-icon');
    expect(warningIcon).toBeNull();
  });

  test('should display a warning icon for the affix type list selector if the affix types are not provided', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());

    const warningIcon = queryByTestId('warning-icon');
    expect(warningIcon).toBeTruthy();
  });

  test('should display the submit button text', () => {
    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const submitButtonText = queryByTestId('submit-button-text');
    expect(submitButtonText).toBeTruthy();
    expect(submitButtonText.props.children).toBe('button.Label');
  });

  test('should display a loading spinner during inflection', () => {
    inflect.mockResolvedValue(new Promise(() => {}));

    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    fireEvent.changeText(lemmaInput, 'alma');

    const editButton = queryByTestId('edit-button');
    expect(editButton).toBeTruthy();
    fireEvent.press(editButton);

    let loadingSpinner = queryByTestId('loading-spinner');
    expect(loadingSpinner).toBeNull();

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());

    loadingSpinner = queryByTestId('loading-spinner');
    expect(loadingSpinner).toBeTruthy();
  });

  test('should navigate to the responses page after the inflection', async () => {
    const responses = [inflectionResponse];
    const responsesPromise = Promise.resolve(responses);
    inflect.mockResolvedValue(responsesPromise);

    const { queryByTestId } = render(
      <InflectionGenerationPage {...props} />
    );

    const lemmaInput = queryByTestId('lemma-input');
    expect(lemmaInput).toBeTruthy();
    fireEvent.changeText(lemmaInput, 'alma');

    const editButton = queryByTestId('edit-button');
    expect(editButton).toBeTruthy();
    fireEvent.press(editButton);

    const submitButton = queryByTestId('submit-button');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    act(() => jest.runAllTimers());
    await act(() => responsesPromise);

    expect(props.navigation.navigate).toHaveBeenCalledWith('MorpherResponses', {
      responses
    });
  });

  describe('navigationOptions', () => {
    let navigationOptions;

    beforeEach(() => {
      props = {
        navigation: {
          toggleDrawer: jest.fn()
        }
      };
      navigationOptions = InflectionGenerationPage.navigationOptions(props);
    });

    describe('headerTitle', () => {
      it('should render the title of the page', () => {
        const HeaderTitle = navigationOptions.headerTitle;

        const { queryByTestId } = render(
          <HeaderTitle />
        );

        const title = queryByTestId('title');
        expect(title).toBeTruthy();
      });
    });

    describe('headerLeft', () => {
      it('should render the menu icon button', () => {
        const HeaderLeft = navigationOptions.headerLeft;

        const { queryByTestId } = render(
          <HeaderLeft />
        );

        const button = queryByTestId('button');
        expect(button).toBeTruthy();
        fireEvent.press(button);

        expect(props.navigation.toggleDrawer).toHaveBeenCalled();
      });
    });
  });
});
