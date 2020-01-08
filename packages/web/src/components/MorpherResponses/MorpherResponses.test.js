import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponses from './MorpherResponses';
import { inflectionResponse, analysisResponse } from '../../mock-responses';

describe('MorpherResponses', () => {
    let props = {};

    beforeEach(() => {
        props = {
            responses: [inflectionResponse, analysisResponse]
        };
    });

    test('should render all the MorpherResponse components', () => {
        const { queryAllByTestId } = render(
            <MorpherResponses {...props} />
        );

        const expansionPanels = queryAllByTestId('expansion-panel');
        expect(expansionPanels).toBeTruthy();
        expect(expansionPanels.length).toBe(props.responses.length);
    });
});
