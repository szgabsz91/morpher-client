import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import MorpherSteps from '../MorpherSteps/MorpherSteps';

export default function MorpherResponseDetails({ response, responseIndex }) {
    const classes = useStyles();
    const [t] = useTranslation('responses');

    return (
        <ExpansionPanelDetails data-testid="expansion-panel-details">
            <div
                className={classes.detailsContainer}
                data-testid="details-container"
            >
                {
                    // istanbul ignore next
                    'development' === process.env.NODE_ENV &&
                        <ul>
                            <li>{t('AffixTypeChainProbabilityText', { value: response.affixTypeChainProbability })}</li>
                            <li>{t('NormalizedAffixTypeChainProbabilityText', { value: response.normalizedAffixTypeChainProbability })}</li>
                        </ul>
                }
                
                <MorpherSteps
                    responseIndex={responseIndex}
                    mode={response.mode}
                    pos={response.pos}
                    steps={response.steps}
                />
            </div>
        </ExpansionPanelDetails>
    );
}

MorpherResponseDetails.propTypes = {
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

const useStyles = makeStyles(theme => ({
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }
}));
