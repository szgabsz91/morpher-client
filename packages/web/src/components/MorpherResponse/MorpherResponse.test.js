import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponse from './MorpherResponse';
import { inflectionResponse } from '../../mock-responses';

describe('MorpherResponse', () => {
    let props;

    beforeEach(() => {
        props = {
            response: inflectionResponse,
            responseIndex: 1
        };
    });

    test('should render the ExpansionPanel', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const expansionPanel = queryByTestId('expansion-panel');
        expect(expansionPanel).toBeTruthy();
    });

    test('should render the MorpherResponseHeader', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const expansionPanelSummary = queryByTestId('expansion-panel-summary');
        expect(expansionPanelSummary).toBeTruthy();
    });

    test('should render the MorpherResponseDetails', () => {
        const { queryByTestId } = render(
            <MorpherResponse {...props} />
        );

        const expansionPanelDetails = queryByTestId('expansion-panel-details');
        expect(expansionPanelDetails).toBeTruthy();
    });
});
