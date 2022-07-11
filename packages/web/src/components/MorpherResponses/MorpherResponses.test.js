import React from 'react';
import { render } from '@testing-library/react';

import MorpherResponses from './MorpherResponses';
import { inflectionResponse, analysisResponse } from '@szg/morpher-client-shared';

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

        const accordions = queryAllByTestId('accordion');
        expect(accordions).toBeTruthy();
        expect(accordions.length).toBe(props.responses.length);
    });
});
