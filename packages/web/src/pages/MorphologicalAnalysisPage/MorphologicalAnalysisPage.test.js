import React from 'react';
import { fireEvent, render, wait, waitForDomChange } from '@testing-library/react';

import MorphologicalAnalysisPage from './MorphologicalAnalysisPage';
import { analyze, analysisResponse } from '@szg/morpher-client-shared';

jest.useFakeTimers();
jest.mock('@szg/morpher-client-shared');

describe('MorphologicalAnalysisPage', () => {
    test('should display the page title', () => {
        const { queryByTestId } = render(
            <MorphologicalAnalysisPage />
        );

        const pageTitle = queryByTestId('page-title');
        expect(pageTitle).toBeTruthy();
        expect(pageTitle.textContent).toBe('Title');
    });

    test('should display the form', () => {
        const { queryByTestId } = render(
            <MorphologicalAnalysisPage />
        );

        const form = queryByTestId('form');
        expect(form).toBeTruthy();
        expect(form).toHaveObfuscatedClass('form');
    });

    test('should display the input field', () => {
        const { queryByTestId } = render(
            <MorphologicalAnalysisPage />
        );

        const inputField = queryByTestId('input-field');
        expect(inputField).toBeTruthy();

        const label = inputField.querySelector('label');
        expect(label.textContent).toBe('input.Label');

        const input = inputField.querySelector('input');
        expect(input.name).toBe('input');
        expect(input.type).toBe('text');
        expect(input.value).toBe('');
    });

    test('should display the submit button', () => {
        const { queryByTestId } = render(
            <MorphologicalAnalysisPage />
        );

        const submitButton = queryByTestId('submit-button');
        expect(submitButton).toBeTruthy();
        expect(submitButton.type).toBe('submit');
        expect(submitButton.textContent).toBe('button.Label');
    });

    test('should show error if there is no provided input lemma', async () => {
        const { container, getByTestId, queryByText } = render(
            <MorphologicalAnalysisPage />
        );

        await wait(() => {
            const submitButton = getByTestId('submit-button');
            fireEvent.click(submitButton);
        });

        const errorInput = container.querySelector('.Mui-error');
        expect(errorInput).toBeTruthy();

        const requiredError = queryByText('input.RequiredError');
        expect(requiredError).toBeTruthy();
    });

    test('should show a loading spinner during analysis, then display the results', async () => {
        analyze.mockReturnValue(new Promise(resolve => {
            setTimeout(() => {
                resolve([analysisResponse]);
            }, 500);
        }));

        const { container, getByTestId, queryByTestId } = render(
            <MorphologicalAnalysisPage />
        );

        await wait(() => {
            const input = getByTestId('input-field').querySelector('input');
            fireEvent.change(input, { target: { value: 'almákat' } });
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
