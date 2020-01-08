import React from 'react';
import { fireEvent, render, waitForDomChange, act, wait } from '@testing-library/react';

import InflectionGenerationPage from './InflectionGenerationPage';
import { getSupportedAffixTypes, inflect } from '@szg/morpher-client-shared';
import { inflectionResponse } from '../../mock-responses';

jest.useFakeTimers();
jest.mock('@szg/morpher-client-shared');

describe('InflectionGenerationPage with affix types loading', () => {
    let supportedAffixTypesPromise;

    beforeEach(() => {
        supportedAffixTypesPromise = Promise.resolve(['AFF1', 'AFF2', 'AFF3']);
        getSupportedAffixTypes.mockResolvedValue(supportedAffixTypesPromise);
    });

    test('should display a loading indicator if the affix types are being loaded', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );

        const pageLoadingContainer = queryByTestId('page-loading-container');
        expect(pageLoadingContainer).toBeTruthy();
        expect(pageLoadingContainer).toHaveObfuscatedClass('pageLoadingContainer');

        const pageLoading = queryByTestId('page-loading');
        expect(pageLoading).toBeTruthy();
        expect(pageLoading).toHaveObfuscatedClass('pageLoading');

        await act(() => supportedAffixTypesPromise);
    });

    test('should not display a loading indicator', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const pageLoadingContainer = queryByTestId('page-loading-container');
        expect(pageLoadingContainer).toBeFalsy();

        const pageLoading = queryByTestId('page-loading');
        expect(pageLoading).toBeFalsy();
    });

    test('should display the page title', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const pageTitle = queryByTestId('page-title');
        expect(pageTitle).toBeTruthy();
        expect(pageTitle.textContent).toBe('Title');
    });

    test('should display the form', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const form = queryByTestId('form');
        expect(form).toBeTruthy();
        expect(form).toHaveObfuscatedClass('form');
    });

    test('should display the input field', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const inputField = queryByTestId('input-field');
        expect(inputField).toBeTruthy();

        const label = inputField.querySelector('label');
        expect(label.textContent).toBe('input.Label');

        const input = inputField.querySelector('input');
        expect(input.name).toBe('input');
        expect(input.type).toBe('text');
        expect(input.value).toBe('');
    });

    test('should display the AffixTypeListSelector', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const grid = queryByTestId('grid');
        expect(grid).toBeTruthy();
    });

    test('should display the submit button', async () => {
        const { queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        const submitButton = queryByTestId('submit-button');
        expect(submitButton).toBeTruthy();
        expect(submitButton.type).toBe('submit');
        expect(submitButton.textContent).toBe('button.Label');
    });

    test('should show error if there is no provided input word', async () => {
        const { container, getByTestId, queryByText } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        await wait(() => {
            const affixTypeListItem = container.querySelector('[data-testid="affix-type"]');
            fireEvent.click(affixTypeListItem);
        });

        await wait(() => {
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
        });

        const errorInput = container.querySelector('.Mui-error');
        expect(errorInput).toBeTruthy();

        const requiredError = queryByText('input.RequiredError');
        expect(requiredError).toBeTruthy();
    });

    test('should show error if there are no provided affix types', async () => {
        const { getByTestId, queryAllByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        await wait(() => {
            const input = getByTestId('input-field').querySelector('input');
            fireEvent.change(input, { target: { value: 'almákat' } });
        });

        await wait(() => {
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
        });

        const cards = queryAllByTestId('card');
        expect(cards).toBeTruthy();
        const card = cards[0];
        expect(card).toHaveObfuscatedClass('error');
    });

    test('should show a loading spinner during inflection, then display the results', async () => {
        inflect.mockReturnValue(new Promise(resolve => {
            setTimeout(() => {
                resolve([inflectionResponse]);
            }, 500);
        }));

        const { container, getByTestId, queryByTestId } = render(
            <InflectionGenerationPage />
        );
        await act(() => supportedAffixTypesPromise);

        await wait(() => {
            const input = getByTestId('input-field').querySelector('input');
            fireEvent.change(input, { target: { value: 'almákat' } });
        });

        await wait(() => {
            const affixTypeListItem = container.querySelector('[data-testid="affix-type"]');
            fireEvent.click(affixTypeListItem);
        });

        await wait(() => {
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
        });

        const loadingSpinner = queryByTestId('loading-spinner');
        expect(loadingSpinner).toBeTruthy();
        expect(container.querySelector('.MuiExpansionPanel-root')).toBeFalsy();

        jest.advanceTimersByTime(1000);
        await waitForDomChange({ container });

        expect(container.querySelector('.MuiExpansionPanel-root')).toBeTruthy();
    });
});
