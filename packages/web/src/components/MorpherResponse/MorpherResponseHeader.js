import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function MorpherResponseHeader({ response, responseIndex }) {
    const classes = useStyles();
    const [t] = useTranslation('responses');

    return (
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`response-${responseIndex}-controls`}
            id={`response-${responseIndex}-header`}
            data-testid="expansion-panel-summary"
        >
            <div
                className={classes.headerContainer}
                data-testid="header-container"
            >
                <div
                    className={classes.contentRow}
                    data-testid="content-row"
                >
                    <div
                        className={clsx(response.mode === 'ANALYSIS' && classes.column)}
                        data-testid="column-sample"
                    >
                        <Typography>
                            {t('affixTypes:Sample', {
                                baseForm: response.input,
                                inflectedForm: response.output
                            })}
                        </Typography>
                    </div>

                    {
                        response.mode === 'ANALYSIS' &&
                            <div
                                className={classes.column}
                                data-testid="column-affix-type-count"
                            >
                                <Typography className={classes.subHeader}>
                                    {t('AffixTypes', { count: response.steps.length })}
                                </Typography>
                            </div>
                    }
                </div>

                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={response.aggregatedWeight * 100}
                    className={classes.linearProgress}
                    data-testid="linear-progress"
                />
            </div>
        </ExpansionPanelSummary>
    );
}

MorpherResponseHeader.propTypes = {
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
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    contentRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        flexBasis: '50%'
    },
    subHeader: {
        color: theme.palette.text.secondary
    },
    linearProgress: {
        marginTop: 10
    }
}));
