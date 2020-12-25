import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import AffixTypeListSelector from './AffixTypeListSelector';

const getAffixTypesOfCard = card => {
    const affixTypeListItems = card.querySelectorAll('[data-testid="affix-type"]');
    expect(affixTypeListItems).toBeTruthy();
    return [...affixTypeListItems].map(affixTypeListItem =>
        affixTypeListItem.querySelector('.MuiListItemText-primary').textContent.replace('.DisplayName', ''));
}

const getUnselectedAffixTypes = queryAllByTestId => {
    const cards = queryAllByTestId('card');
    const firstCard = cards[0];
    return getAffixTypesOfCard(firstCard);
};

const getSelectedAffixTypes = queryAllByTestId => {
    const cards = queryAllByTestId('card');
    const secondCard = cards[1];
    return getAffixTypesOfCard(secondCard);
};

describe('AffixTypeListSelector', () => {
    let props;

    beforeEach(() => {
        props = {
            affixTypes: ['AFF1', 'AFF2', 'AFF3'],
            value: ['AFF3'],
            error: false,
            name: 'name',
            handleChange: jest.fn(),
            setFieldTouched: jest.fn()
        };
    });

    test('should display the Grid', () => {
        const { queryByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const grid = queryByTestId('grid');
        expect(grid).toBeTruthy();
    });

    test('should display two AffixTypeList components', () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = queryAllByTestId('card');
        expect(cards).toBeTruthy();
        expect(cards.length).toBe(2);
    });

    test('should display two AffixTypeList components with an extra class if the error prop is true', () => {
        props = {
            ...props,
            error: true
        };

        const { getAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = getAllByTestId('card');
        expect(cards.length).toBe(2);
        expect(cards[0]).toHaveObfuscatedClass('error');
        expect(cards[1]).toHaveObfuscatedClass('error');
    });

    test('should display a filter in the first AffixTypeList component', () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = queryAllByTestId('card');
        const firstCard = cards[0];
        const filterInput = firstCard.querySelector('input');
        expect(filterInput).toBeTruthy();
    });

    test('should not display a filter in the second AffixTypeList component', () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = queryAllByTestId('card');
        const secondCard = cards[1];
        const filterInput = secondCard.querySelector('input');
        expect(filterInput).toBeFalsy();
    });

    test('should display the unselected affix types in the first AffixTypeList component', () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const unselectedAffixTypes = getUnselectedAffixTypes(queryAllByTestId);
        const expectedAffixTypes = props.affixTypes.filter(affixType => !props.value.includes(affixType));
        expect(unselectedAffixTypes).toEqual(expectedAffixTypes);
    });

    test('should display the selected affix types in the second AffixTypeList component', () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const selectedAffixTypes = getSelectedAffixTypes(queryAllByTestId);
        expect(selectedAffixTypes).toEqual(props.value);
    });

    test('should move the clicked affix type from the first AffixTypeList to the second AffixTypeList', async () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = queryAllByTestId('card');
        const firstCard = cards[0];
        
        const affixTypeListItem = firstCard.querySelector('[data-testid="affix-type"]');
        const primary = affixTypeListItem.querySelector('.MuiListItemText-primary');
        const selectedAffixType = primary.textContent.replace('.DisplayName', '');
        fireEvent.click(affixTypeListItem);

        const selectedAffixTypes = getSelectedAffixTypes(queryAllByTestId);
        const newSelectedAffixTypes = [
            ...selectedAffixTypes,
            selectedAffixType
        ];

        expect(props.handleChange).toBeCalledWith({
            target: {
                id: props.name,
                value: newSelectedAffixTypes
            }
        });
        expect(props.setFieldTouched).toBeCalledWith(props.name, true, false);
    });

    test('should move the clicked affix type from the second AffixTypeList to the first AffixTypeList', async () => {
        const { queryAllByTestId } = render(
            <AffixTypeListSelector {...props} />
        );

        const cards = queryAllByTestId('card');
        const secondCard = cards[1];
        
        const affixTypeListItem = secondCard.querySelector('[data-testid="affix-type"]');
        const primary = affixTypeListItem.querySelector('.MuiListItemText-primary');
        const unselectedAffixType = primary.textContent.replace('.DisplayName', '');
        fireEvent.click(affixTypeListItem);

        const selectedAffixTypes = getSelectedAffixTypes(queryAllByTestId);
        const newSelectedAffixTypes = selectedAffixTypes.filter(affixType => unselectedAffixType !== affixType);

        expect(props.handleChange).toBeCalledWith({
            target: {
                id: props.name,
                value: newSelectedAffixTypes
            }
        });
        expect(props.setFieldTouched).toBeCalledWith(props.name, true, false);
    });
});
