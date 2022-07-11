import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import AffixTypeListSelector from './AffixTypeListSelector';
import { initialWindowMetrics } from '../../testing/initialWindowMetrics';

describe('AffixTypeListSelector', () => {
  const newlySelectedAffixTypes = ['AFF1', 'AFF2'];
  let props;

  beforeEach(() => {
    props = {
      value: [],
      name: 'affixTypes',
      handleChange: jest.fn(),
      setFieldTouched: jest.fn(),
      navigation: {
        navigate: jest.fn((routeName, { onReceiveAffixTypeList }) => {
          onReceiveAffixTypeList(newlySelectedAffixTypes);
        })
      }
    };
  });

  test('should not display an extra style if no style is provided', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const rowContainer = queryByTestId('row-container');
    expect(rowContainer).toBeTruthy();
    expect(rowContainer.props.style[1]).toBeUndefined();
  });

  test('should display the provided style if it is provided', () => {
    props = {
      ...props,
      style: {
        backgroundColor: 'red'
      }
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const rowContainer = queryByTestId('row-container');
    expect(rowContainer).toBeTruthy();
    expect(rowContainer.props.style[1]).toEqual(props.style);
  });

  test('should display the label', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const label = queryByTestId('label');
    expect(label).toBeTruthy();
    expect(label.props.children).toBe('Label');
  });

  test('should display an empty message if the value is empty', () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeTruthy();
    expect(emptyMessageText.props.children).toBe('EmptyMessage');

    const affixTypeText = queryByTestId('affix-type-text');
    expect(affixTypeText).toBeNull();
  });

  test('should display the selected affix types', () => {
    props = {
      ...props,
      value: ['AFF1', 'AFF2', 'AFF3']
    };

    const { queryByTestId, queryAllByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeNull();

    const affixTypeTexts = queryAllByTestId('affix-type-text');
    expect(affixTypeTexts).toBeTruthy();

    const affixTypes = affixTypeTexts.map(
      affixTypeText => affixTypeText.props.children
    );
    const expectedAffixTypes = props.value.map(
      affixType => `${affixType}.DisplayName`
    );
    expect(affixTypes).toEqual(expectedAffixTypes);
  });

  test('should navigate to the affix type selector page if the edit button is pressed', () => {
    props = {
      ...props,
      value: ['AFF1', 'AFF2', 'AFF3']
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={initialWindowMetrics}>
        <AffixTypeListSelector {...props} />
      </NativeBaseProvider>
    );

    const editButton = queryByTestId('edit-button');
    expect(editButton).toBeTruthy();
    fireEvent.press(editButton);

    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'AffixTypeListSelector',
      {
        selectedAffixTypes: props.value,
        onReceiveAffixTypeList: expect.any(Function)
      }
    );

    expect(props.setFieldTouched).toHaveBeenCalledWith(props.name, true, false);
    expect(props.handleChange).toHaveBeenCalledWith({
      target: {
        id: props.name,
        value: newlySelectedAffixTypes
      }
    });
  });
});
