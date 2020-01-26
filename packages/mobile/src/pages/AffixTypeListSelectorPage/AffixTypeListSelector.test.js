import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import AffixTypeListSelector from './AffixTypeListSelector';

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
      <AffixTypeListSelector {...props} />
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
      <AffixTypeListSelector {...props} />
    );

    const rowContainer = queryByTestId('row-container');
    expect(rowContainer).toBeTruthy();
    expect(rowContainer.props.style[1]).toEqual(props.style);
  });

  test('should display the label', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const label = queryByTestId('label');
    expect(label).toBeTruthy();
    expect(label.props.children).toBe('Label');

    const styleObjectsWithColor = label.props.style.filter(s => s.color);
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).not.toBe('#db423a');
  });

  test('should display the label with the error style if the error flag is true', () => {
    props = {
      ...props,
      error: true
    };

    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const label = queryByTestId('label');
    expect(label).toBeTruthy();

    const styleObjectsWithColor = label.props.style.filter(s => s.color);
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).toBe('#db423a');
  });

  test('should display an empty message if the value is empty', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeTruthy();
    expect(emptyMessageText.props.children).toBe('EmptyMessage');

    const styleObjectsWithColor = emptyMessageText.props.style.filter(
      s => s.color
    );
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).not.toBe('#db423a');

    const affixTypeText = queryByTestId('affix-type-text');
    expect(affixTypeText).toBeNull();
  });

  test('should display the empty message with the error style if the error flag is true', () => {
    props = {
      ...props,
      error: true
    };

    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeTruthy();

    const styleObjectsWithColor = emptyMessageText.props.style.filter(
      s => s.color
    );
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).toBe('#db423a');
  });

  test('should display the selected affix types', () => {
    props = {
      ...props,
      value: ['AFF1', 'AFF2', 'AFF3']
    };

    const { queryByTestId, queryAllByTestId } = render(
      <AffixTypeListSelector {...props} />
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
      <AffixTypeListSelector {...props} />
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

  test('should not display a warning icon if the error flag is false', () => {
    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const warningIcon = queryByTestId('warning-icon');
    expect(warningIcon).toBeNull();
  });

  test('should display a warning icon if the error flag is true', () => {
    props = {
      ...props,
      error: true
    };

    const { queryByTestId } = render(
      <AffixTypeListSelector {...props} />
    );

    const warningIcon = queryByTestId('warning-icon');
    expect(warningIcon).toBeTruthy();
    expect(warningIcon.props.type).toBe('MaterialIcons');

    const styleObjectsWithColor = warningIcon.props.style[1].filter(
      s => s.color
    );
    const color = styleObjectsWithColor[styleObjectsWithColor.length - 1].color;
    expect(color).toBe('#db423a');
  });
});
