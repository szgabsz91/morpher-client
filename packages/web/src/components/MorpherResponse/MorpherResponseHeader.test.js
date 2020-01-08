import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponseHeader from './MorpherResponseHeader';
import { inflectionResponse } from '../../mock-responses';

describe('MorpherResponseHeader', () => {
    let props;

    beforeEach(() => {
        props = {
            response: inflectionResponse,
            responseIndex: 1
        };
    });

    test('should display the ExpansionPanelSummary with the expand icon', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const expansionPanelSummary = queryByTestId('expansion-panel-summary');
        expect(expansionPanelSummary).toBeTruthy();
        expect(expansionPanelSummary).toHaveAttribute('aria-controls', `response-${props.responseIndex}-controls`);
        expect(expansionPanelSummary).toHaveAttribute('id', `response-${props.responseIndex}-header`);

        const expandMoreIcon = expansionPanelSummary.querySelector('svg');
        expect(expandMoreIcon).toBeTruthy();
    });

    test('should display the header container', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const headerContainer = queryByTestId('header-container');
        expect(headerContainer).toBeTruthy();
        expect(headerContainer).toHaveObfuscatedClass('headerContainer');
    });

    test('should display the content row', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const contentRow = queryByTestId('content-row');
        expect(contentRow).toBeTruthy();
        expect(contentRow).toHaveObfuscatedClass('contentRow');
    });

    test('should display the first column without an extra class in case of inflection', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const sampleColumn = queryByTestId('column-sample');
        expect(sampleColumn).toBeTruthy();
        expect(sampleColumn).not.toHaveObfuscatedClass('column');
        expect(sampleColumn.textContent).toBe('affixTypes:Sample');
    });

    test('should display the first column with an extra class in case of analysis', () => {
        props = {
            ...props,
            response: {
                ...props.response,
                mode: 'ANALYSIS'
            }
        };

        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const sampleColumn = queryByTestId('column-sample');
        expect(sampleColumn).toBeTruthy();
        expect(sampleColumn).toHaveObfuscatedClass('column');
        expect(sampleColumn.textContent).toBe('affixTypes:Sample');
    });

    test('should not display the second column in case of inflection', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const affixTypeCountColumn = queryByTestId('column-affix-type-count');
        expect(affixTypeCountColumn).toBeFalsy();
    });

    test('should display the second column in case of analysis', () => {
        props = {
            ...props,
            response: {
                ...props.response,
                mode: 'ANALYSIS'
            }
        };

        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const affixTypeCountColumn = queryByTestId('column-affix-type-count');
        expect(affixTypeCountColumn).toBeTruthy();
        expect(affixTypeCountColumn).toHaveObfuscatedClass('column');
        expect(affixTypeCountColumn.textContent).toBe('AffixTypes');
    });

    test('should display the LinerProgress', () => {
        const { queryByTestId } = render(
            <MorpherResponseHeader {...props} />
        );

        const linearProgress = queryByTestId('linear-progress');
        expect(linearProgress).toBeTruthy();
        expect(linearProgress).toHaveObfuscatedClass('linearProgress');
        expect(linearProgress).toHaveAttribute('aria-valuenow', String(props.response.aggregatedWeight * 100));
    });
});
