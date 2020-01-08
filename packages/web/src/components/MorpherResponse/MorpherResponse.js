import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import MorpherResponseHeader from './MorpherResponseHeader';
import MorpherResponseDetails from './MorpherResponseDetails';

export default function MorpherResponse({ response, responseIndex }) {
    return (
        <ExpansionPanel data-testid="expansion-panel">
            <MorpherResponseHeader
                responseIndex={responseIndex}
                response={response}
            />

            <MorpherResponseDetails
                responseIndex={responseIndex}
                response={response}
            />
        </ExpansionPanel>
    );
}

MorpherResponse.propTypes = {
    response: PropTypes.shape({
        mode: PropTypes.string.isRequired,
        input: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired,
        pos: PropTypes.shape({
            affixType: PropTypes.string.isRequired,
            probability: PropTypes.number.isRequired
        }).isRequired,
        affixTypeChainProbability: PropTypes.number.isRequired,
        steps: PropTypes.arrayOf(PropTypes.shape({
            input: PropTypes.string.isRequired,
            output: PropTypes.string.isRequired,
            affixType: PropTypes.string.isRequired,
            affixTypeProbability: PropTypes.number.isRequired,
            outputWordProbability: PropTypes.number.isRequired,
            aggregatedProbability: PropTypes.number.isRequired
        })).isRequired,
        normalizedAffixTypeChainProbability: PropTypes.number.isRequired,
        aggregatedWeight: PropTypes.number.isRequired
    }).isRequired,
    responseIndex: PropTypes.number.isRequired
};
