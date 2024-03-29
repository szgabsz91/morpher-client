import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponseDetails from './MorpherResponseDetails';
import { inflectionResponse } from '@szg/morpher-client-shared';

describe('MorpherResponseDetails', () => {
    let props;

    beforeEach(() => {
        props = {
            response: inflectionResponse,
            responseIndex: 1
        };
    });

    test('should render the AccordionDetails', () => {
        const { queryByTestId } = render(
            <MorpherResponseDetails {...props} />
        );

        const accordionDetails = queryByTestId('accordion-details');
        expect(accordionDetails).toBeTruthy();
    });

    test('should render the details container', () => {
        const { queryByTestId } = render(
            <MorpherResponseDetails {...props} />
        );

        const detailsContainer = queryByTestId('details-container');
        expect(detailsContainer).toBeTruthy();
        expect(detailsContainer).toHaveObfuscatedClass('detailsContainer');
    });

    test('should render the steps', () => {
        const { queryByTestId } = render(
            <MorpherResponseDetails {...props} />
        );

        const tableContainer = queryByTestId('table-container');
        expect(tableContainer).toBeTruthy();
    });
});
