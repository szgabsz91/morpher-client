import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponse from './MorpherResponse';
import { inflectionResponse } from '@szg/morpher-client-shared';

describe('MorpherResponse', () => {
    let props;

    beforeEach(() => {
        props = {
            response: inflectionResponse,
            responseIndex: 1
        };
    });

    test('should render the Accordion', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const accordion = queryByTestId('accordion');
        expect(accordion).toBeTruthy();
    });

    test('should render the MorpherResponseHeader', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const accordionSummary = queryByTestId('accordion-summary');
        expect(accordionSummary).toBeTruthy();
    });

    test('should render the MorpherResponseDetails', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const accordionDetails = queryByTestId('accordion-details');
        expect(accordionDetails).toBeTruthy();
    });
});
