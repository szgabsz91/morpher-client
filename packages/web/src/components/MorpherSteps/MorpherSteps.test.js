import React from 'react';
import { render } from '@testing-library/react';

import MorpherSteps from './MorpherSteps';
import { inflectionResponse } from '../../mock-responses';

describe('MorpherSteps', () => {
    let props;

    beforeEach(() => {
        props = {
            responseIndex: 1,
            mode: 'INFLECTION',
            pos: inflectionResponse.pos,
            steps: inflectionResponse.steps
        };
    });

    test('should display the TableContainer', () => {
        const { queryByTestId } = render(
            <MorpherSteps {...props} />
        );

        const tableContainer = queryByTestId('table-container');
        expect(tableContainer).toBeTruthy();
    });

    test('should display the Table', () => {
        const { queryByTestId } = render(
            <MorpherSteps {...props} />
        );

        const table = queryByTestId('table');
        expect(table).toBeTruthy();
        expect(table).toHaveAttribute('aria-label', 'table.Label');
    });

    test('should display the TableHead with three th elements', () => {
        const { queryByTestId } = render(
            <MorpherSteps {...props} />
        );

        const tableHead = queryByTestId('table-head');
        expect(tableHead).toBeTruthy();

        const tableHeadRows = tableHead.querySelectorAll('tr');
        expect(tableHeadRows).toBeTruthy();
        expect(tableHeadRows.length).toBe(1);

        const tableHeadRow = tableHeadRows[0];
        const tableHeadCells = [...tableHeadRow.querySelectorAll('th')];
        const tableHeadCellContents = tableHeadCells.map(th => th.textContent);
        expect(tableHeadCellContents).toEqual([
            'table.AffixTypeHeader',
            'table.OutputHeader',
            'table.ProbabilityHeader'
        ]);
        expect(tableHeadCells[tableHeadCells.length - 1]).toHaveClass('MuiTableCell-alignRight');
    });

    test('should display the TableBody with all the rows and the POS row as the first one in case of inflection', () => {
        const { queryByTestId } = render(
            <MorpherSteps {...props} />
        );

        const tableBody = queryByTestId('table-body');
        expect(tableBody).toBeTruthy();

        const tableBodyRows = tableBody.querySelectorAll('tr');
        expect(tableBodyRows).toBeTruthy();
        expect(tableBodyRows.length).toBe(props.steps.length + 1);

        const firstTableBodyRow = tableBodyRows[0];
        const firstTableBodyRowAffixType = firstTableBodyRow.querySelector('[data-testid="table-cell-affix-type"]');
        expect(firstTableBodyRowAffixType.textContent).toBe(`affixTypes:${props.pos.affixType}.DisplayName`);
    });

    test('should display the TableBody with all the rows and the POS row as the last one in case of analysis', () => {
        props = {
            ...props,
            mode: 'ANALYSIS'
        };

        const { queryByTestId } = render(
            <MorpherSteps {...props} />
        );

        const tableBody = queryByTestId('table-body');
        expect(tableBody).toBeTruthy();

        const tableBodyRows = tableBody.querySelectorAll('tr');
        expect(tableBodyRows).toBeTruthy();
        expect(tableBodyRows.length).toBe(props.steps.length + 1);

        const lastTableBodyRow = tableBodyRows[tableBodyRows.length - 1];
        const lastTableBodyRowAffixType = lastTableBodyRow.querySelector('[data-testid="table-cell-affix-type"]');
        expect(lastTableBodyRowAffixType.textContent).toBe(`affixTypes:${props.pos.affixType}.DisplayName`);
    });
});
