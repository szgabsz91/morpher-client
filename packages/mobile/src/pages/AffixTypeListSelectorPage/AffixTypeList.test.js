import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import AffixTypeList from './AffixTypeList';

describe('AffixTypeList', () => {
  let props;

  beforeEach(() => {
    props = {
      affixTypes: [],
      selectedAffixTypes: [],
      onSelectedAffixTypesChanged: jest.fn()
    };
  });

  test('should display a filter text input', () => {
    const { queryByTestId } = render(
      <AffixTypeList {...props} />
    );

    const filterTextInput = queryByTestId('filter-text-input');
    expect(filterTextInput).toBeTruthy();
    expect(filterTextInput.props.placeholder).toBe('filter.Label');
    expect(filterTextInput.props.autoCapitalize).toBe('none');
    expect(filterTextInput.props.autoCorrect).toBeFalsy();
    expect(filterTextInput.props.value).toBe('');
  });

  test('should display an empty message if it is provided and the list is empty', () => {
    props = {
      ...props,
      emptyMessage: 'Empty'
    };

    const { queryByTestId, queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeTruthy();
    expect(emptyMessageText.props.children).toBe(props.emptyMessage);

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(0);

    const loadingSpinner = queryByTestId('loading-spinner');
    expect(loadingSpinner).toBeNull();
  });

  test('should display a loading spinner if no empty message is provided and the list is empty', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const emptyMessageText = queryByTestId('empty-message-text');
    expect(emptyMessageText).toBeNull();

    const subheaders = queryAllByTestId('subheader');
    expect(subheaders).toBeTruthy();
    expect(subheaders.length).toBe(0);

    const loadingSpinner = queryByTestId('loading-spinner');
    expect(loadingSpinner).toBeTruthy();
    expect(loadingSpinner.props.color).toBe('green');
  });

  test('should display the affix types in a list', () => {
    props = {
      ...props,
      affixTypes: ['AFF11', 'aff12', 'Aff3']
    };

    const { queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const affixTypeListItems = queryAllByTestId('affix-type-list-item');
    expect(affixTypeListItems).toBeTruthy();
    affixTypeListItems.forEach(affixTypeListItem =>
      fireEvent.press(affixTypeListItem)
    );

    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith(
      props.affixTypes
    );
  });

  test('should display the filtered affix types in a list', () => {
    props = {
      ...props,
      affixTypes: ['AFF11', 'aff12', 'Aff3']
    };

    const { queryByTestId, queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const filterTextInput = queryByTestId('filter-text-input');
    expect(filterTextInput).toBeTruthy();
    fireEvent.changeText(filterTextInput, 'fF1');

    const affixTypeListItems = queryAllByTestId('affix-type-list-item');
    expect(affixTypeListItems).toBeTruthy();
    affixTypeListItems.forEach(affixTypeListItem =>
      fireEvent.press(affixTypeListItem)
    );

    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith([
      'AFF11',
      'aff12'
    ]);
    expect(props.onSelectedAffixTypesChanged).not.toHaveBeenCalledWith(
      props.affixTypes
    );
  });

  test('should toggle the affix type if its row is pressed', () => {
    props = {
      ...props,
      affixTypes: ['AFF11', 'aff12', 'Aff3']
    };

    const { queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const affixTypeListItems = queryAllByTestId('affix-type-list-item');
    expect(affixTypeListItems).toBeTruthy();
    expect(affixTypeListItems.length).toBe(3);
    const affixTypeListItem = affixTypeListItems[0];

    fireEvent.press(affixTypeListItem);
    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith(['AFF11']);

    fireEvent.press(affixTypeListItem);
    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith([]);
  });

  test('should toggle the affix type if its checkbox is toggled', () => {
    props = {
      ...props,
      affixTypes: ['AFF11', 'aff12', 'Aff3']
    };

    const { queryAllByTestId } = render(
      <AffixTypeList {...props} />
    );

    const affixTypeCheckboxes = queryAllByTestId('affix-type-checkbox');
    expect(affixTypeCheckboxes).toBeTruthy();
    expect(affixTypeCheckboxes.length).toBe(3);
    const affixTypeCheckbox = affixTypeCheckboxes[0];

    fireEvent.press(affixTypeCheckbox);
    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith(['AFF11']);

    fireEvent.press(affixTypeCheckbox);
    expect(props.onSelectedAffixTypesChanged).toHaveBeenCalledWith([]);
  });
});
