import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import MorpherStepInfoPopover from './MorpherStepInfoPopover';

export default function MorpherStep({ responseIndex, stepIndex, step }) {
    const classes = useStyles();
    const [t] = useTranslation('responses');
    const isPos = step.affixType.startsWith('/');

    return (
        <TableRow data-testid="table-row">
            <TableCell
                scope="row"
                data-testid="table-cell-affix-type"
            >
                {t(`affixTypes:${step.affixType}.DisplayName`)}
                {
                    // istanbul ignore next
                    !isPos &&
                        <MorpherStepInfoPopover popoverId={`affix-type-info-${responseIndex}-${stepIndex}`}>
                            <Typography className={classes.infoContainer}>
                                {t('affixTypes:Sample', {
                                    baseForm: t(`affixTypes:${step.affixType}.SampleBaseForm`),
                                    inflectedForm: t(`affixTypes:${step.affixType}.SampleInflectedForm`)
                                })}
                            </Typography>
                        </MorpherStepInfoPopover>
                }
            </TableCell>

            <TableCell data-testid="table-cell-output">{step.output}</TableCell>

            <TableCell
                align="right"
                data-testid="table-cell-probability"
            >
                {
                    // istanbul ignore next
                    'development' === process.env.NODE_ENV && !isPos &&
                        <MorpherStepInfoPopover popoverId={`probability-info-${responseIndex}-${stepIndex}`}>
                            <ul className={classes.infoContainer}>
                                <li>
                                    <Typography>{t('AffixTypeProbability', { value: step.affixTypeProbability })}</Typography>
                                </li>
                                <li>
                                    <Typography>{t('OutputWordProbability', { value: step.outputWordProbability })}</Typography>
                                </li>
                                <li>
                                    <Typography>{t('AggregatedProbability', { value: step.aggregatedProbability })}</Typography>
                                </li>
                            </ul>
                        </MorpherStepInfoPopover>
                }
                {step.aggregatedProbability}
            </TableCell>
        </TableRow>
    );
}

MorpherStep.propTypes = {
    responseIndex: PropTypes.number.isRequired,
    stepIndex: PropTypes.number.isRequired,
    step: PropTypes.shape({
        input: PropTypes.string,
        output: PropTypes.string,
        affixType: PropTypes.string.isRequired,
        affixTypeProbability: PropTypes.number,
        outputWordProbability: PropTypes.number,
        aggregatedProbability: PropTypes.number.isRequired
    }).isRequired
};

const useStyles = makeStyles(theme => ({
    infoContainer: {
        margin: theme.spacing(2)
    }
}));
