import React from 'react';
import { render } from '@testing-library/react';

import MorpherStep from './MorpherStep';
import { inflectionResponse } from '../../mock-responses';

describe('MorpherStep', () => {
    let props;

    beforeEach(() => {
        props = {
            responseIndex: 2,
            stepIndex: 3,
            step: inflectionResponse.steps[0]
        };
    });

    test('should display the TableRow', () => {
        const { queryByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const tableRow = queryByTestId('table-row');
        expect(tableRow).toBeTruthy();
    });

    test('should display the affix type name', () => {
        const { queryByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const affixTypeCell = queryByTestId('table-cell-affix-type');
        expect(affixTypeCell).toBeTruthy();
        expect(affixTypeCell).toHaveAttribute('scope', 'row');
        expect(affixTypeCell.textContent).toBe(`affixTypes:${props.step.affixType}.DisplayName`);

        const helpIconButton = affixTypeCell.querySelector('button');
        expect(helpIconButton).toBeTruthy();
    });

    test('should display a sample word pair if the affix type is not a POS', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const affixTypeCell = getByTestId('table-cell-affix-type');
        const helpIconButton = affixTypeCell.querySelector('button');
        expect(helpIconButton).toBeTruthy();
    });

    test('should not display a sample word pair if the affix type is a POS', () => {
        props = {
            ...props,
            step: {
                ...props.step,
                affixType: '/NOUN'
            }
        };

        const { getByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const affixTypeCell = getByTestId('table-cell-affix-type');
        const helpIconButton = affixTypeCell.querySelector('button');
        expect(helpIconButton).toBeFalsy();
    });

    test('should display the output', () => {
        const { queryByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const outputCell = queryByTestId('table-cell-output');
        expect(outputCell).toBeTruthy();
        expect(outputCell.textContent).toBe(props.step.output);
    });

    test('should display the probability', () => {
        const { queryByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const probabilityCell = queryByTestId('table-cell-probability');
        expect(probabilityCell).toBeTruthy();
        expect(probabilityCell.textContent).toBe(props.step.aggregatedProbability.toString());
    });

    test('should not display additional probability values if the mode is not development', () => {
        const { queryByTestId } = render(
            <table>
                <tbody>
                    <MorpherStep {...props} />
                </tbody>
            </table>
        );

        const probabilityCell = queryByTestId('table-cell-probability');
        const helpIconButton = probabilityCell.querySelector('button');
        expect(helpIconButton).toBeFalsy();
    });
});
