import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MorpherStep from '../MorpherStep/MorpherStep';

export default function MorpherSteps({ responseIndex, mode, pos, steps }) {
    const [t] = useTranslation('responses');

    const posStep = {
        affixType: pos.affixType,
        aggregatedProbability: pos.probability
    };
    steps = mode === 'INFLECTION' ?
        [posStep, ...steps] :
        [...steps, posStep];

    return (
        <TableContainer
            component={Paper}
            data-testid="table-container"
        >
            <Table
                aria-label={t('table.Label')}
                data-testid="table"
            >
                <TableHead data-testid="table-head">
                    <TableRow>
                        <TableCell>{t('table.AffixTypeHeader')}</TableCell>
                        <TableCell>{t('table.OutputHeader')}</TableCell>
                        <TableCell align="right">{t('table.ProbabilityHeader')}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody data-testid="table-body">
                    {
                        steps.map((step, stepIndex) => (
                            <MorpherStep
                                key={stepIndex}
                                responseIndex={responseIndex}
                                stepIndex={stepIndex}
                                step={step}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

MorpherSteps.propTypes = {
    responseIndex: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    pos: PropTypes.shape({
        affixType: PropTypes.string.isRequired,
        probability: PropTypes.number.isRequired
    }).isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
        input: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired,
        affixType: PropTypes.string.isRequired,
        affixTypeProbability: PropTypes.number.isRequired,
        outputWordProbability: PropTypes.number.isRequired,
        aggregatedProbability: PropTypes.number.isRequired
    })).isRequired
};
