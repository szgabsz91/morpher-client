import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import AffixTypeList from './AffixTypeList';

describe('AffixTypeList', () => {
    let props;

    beforeEach(() => {
        props = {
            affixTypes: ['AFF11', 'aff12', 'Aff3'],
            onAffixTypeClicked: jest.fn()
        };
    });

    test('should display the Card', () => {
        const { queryByTestId } = render(
            <AffixTypeList {...props} />
        );

        const card = queryByTestId('card');
        expect(card).toBeTruthy();
        expect(card).not.toHaveObfuscatedClass('error');
    });

    test('should display the Card with an extra class in case of error', () => {
        props = {
            ...props,
            error: true
        };

        const { queryByTestId } = render(
            <AffixTypeList {...props} />
        );

        const card = queryByTestId('card');
        expect(card).toBeTruthy();
        expect(card).toHaveObfuscatedClass('error');
    });

    test('should display the CardHeader', () => {
        const { queryByTestId } = render(
            <AffixTypeList {...props} />
        );

        const cardHeader = queryByTestId('card-header');
        expect(cardHeader).toBeTruthy();
        expect(cardHeader).toHaveObfuscatedClass('cardHeader');
    });

    test('should display the internal div in the CardHeader', () => {
        const { queryByTestId } = render(
            <AffixTypeList {...props} />
        );

        const cardHeader = queryByTestId('card-header');
        const cardHeaderInternal = cardHeader.querySelector('[data-testid="card-header-internal"]');
        expect(cardHeaderInternal).toBeTruthy();
        expect(cardHeaderInternal).toHaveObfuscatedClass('cardHeaderInternal');
    });

    test('should display a filter text input if the showFilter prop is true', () => {
        props = {
            ...props,
            showFilter: true,
        };

        const { getByTestId } = render(
            <AffixTypeList {...props} />
        );

        const cardHeaderInternal = getByTestId('card-header-internal');
        
        const filterInputRoot = cardHeaderInternal.querySelector('.MuiTextField-root');
        expect(filterInputRoot).toBeTruthy();
        expect(filterInputRoot).toHaveObfuscatedClass('affixTypeFilter');

        const filterInput = cardHeaderInternal.querySelector('input');
        expect(filterInput).toBeTruthy();
        expect(filterInput).toHaveAttribute('autocomplete', 'off');
        expect(filterInput.value).toBe('');

        const filterLabel = cardHeaderInternal.querySelector('label');
        expect(filterLabel).toBeTruthy();
        expect(filterLabel.textContent).toBe('filter.Label');
    });

    test('should display a label of "selected affix type" if the showFilter prop is false', () => {
        const { getByTestId } = render(
            <AffixTypeList {...props} />
        );

        const cardHeaderInternal = getByTestId('card-header-internal');
        expect(cardHeaderInternal.textContent).toBe('filter.SelectedAffixTypeText');
        
        const filterInputRoot = cardHeaderInternal.querySelector('.MuiTextField-root');
        expect(filterInputRoot).toBeFalsy();
    });

    test('should display a Divider', () => {
        const { queryByTestId } = render(
            <AffixTypeList {...props} />
        );

        const divider = queryByTestId('divider');
        expect(divider).toBeTruthy();
    });

    test('should display the affix types in a list', () => {
        const { queryAllByTestId } = render(
            <AffixTypeList {...props} />
        );

        const affixTypeListItems = queryAllByTestId('affix-type');
        expect(affixTypeListItems).toBeTruthy();
        expect(affixTypeListItems.length).toBe(props.affixTypes.length);

        affixTypeListItems.forEach((affixTypeListItem, affixTypeIndex) => {
            const primary = affixTypeListItem.querySelector('.MuiListItemText-primary');
            expect(primary).toBeTruthy();
            expect(primary.textContent).toBe(`${props.affixTypes[affixTypeIndex]}.DisplayName`);

            const secondary = affixTypeListItem.querySelector('.MuiListItemText-secondary');
            expect(secondary).toBeTruthy();
            expect(secondary.textContent).toBe('Sample');
        });
    });

    test('should filter the filtered affix types based on the value of the filter text input', () => {
        props = {
            ...props,
            showFilter: true
        };

        const { getByTestId, queryAllByTestId } = render(
            <AffixTypeList {...props} />
        );

        const expectedAffixTypes = [props.affixTypes[0], props.affixTypes[1]];
        const cardHeaderInternal = getByTestId('card-header-internal');
        const filterInput = cardHeaderInternal.querySelector('input');
        fireEvent.change(filterInput, { target: { value: 'fF1' }});

        const affixTypeListItems = queryAllByTestId('affix-type');
        expect(affixTypeListItems).toBeTruthy();
        expect(affixTypeListItems.length).toBe(expectedAffixTypes.length);

        affixTypeListItems.forEach((affixTypeListItem, affixTypeIndex) => {
            const primary = affixTypeListItem.querySelector('.MuiListItemText-primary');
            expect(primary).toBeTruthy();
            expect(primary.textContent).toBe(`${expectedAffixTypes[affixTypeIndex]}.DisplayName`);

            const secondary = affixTypeListItem.querySelector('.MuiListItemText-secondary');
            expect(secondary).toBeTruthy();
            expect(secondary.textContent).toBe('Sample');
        });
    });
});
