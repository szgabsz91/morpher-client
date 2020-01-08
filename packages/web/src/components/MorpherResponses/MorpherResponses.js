import React from 'react';
import PropTypes from 'prop-types';

import MorpherResponse from '../MorpherResponse/MorpherResponse';

export default function MorpherResponses({ responses }) {
    return (
        <>
            {
                responses.map((response, responseIndex) => (
                    <MorpherResponse
                        key={responseIndex}
                        response={response}
                        responseIndex={responseIndex}
                    />
                ))
            }
        </>
    );
}

MorpherResponses.propTypes = {
    responses: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired
};
