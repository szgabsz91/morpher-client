import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { object, string } from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { analyze } from '@szg/morpher-client-shared';

import MorpherResponses from '../../components/MorpherResponses/MorpherResponses';

export default function MorphologicalAnalysisPage() {
    const [t] = useTranslation('morphologicalAnalysis');
    const [analysisResponses, setAnalysisResponses] = useState([]);
    const classes = useStyles();

    const analyzeWord = ({ input }, { setSubmitting }) => {
        analyze(input)
            .then(setAnalysisResponses)
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <h2 data-testid="page-title">{t('Title')}</h2>

            <Formik
                initialValues={{ input: '' }}
                validationSchema={object({
                    input: string().required(t('input.RequiredError'))
                })}
                onSubmit={analyzeWord}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    data-testid="form"
                >
                    <TextField
                        name="input"
                        autoComplete="off"
                        label={t('input.Label')}
                        error={touched.input && !!errors.input}
                        helperText={touched.input && errors.input && t('input.RequiredError')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.input}
                        data-testid="input-field"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        className={classes.button}
                        data-testid="submit-button"
                    >
                        {t('button.Label')}
                    </Button>

                    {
                        isSubmitting &&
                            <CircularProgress
                                className={classes.loading}
                                data-testid="loading-spinner"
                            />
                    }
                </form>
            )}</Formik>

            {
                analysisResponses.length > 0 &&
                    <MorpherResponses responses={analysisResponses} />
            }
        </>
    );
}

MorphologicalAnalysisPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        marginTop: 20,
        marginBottom: 20
    },
    loading: {
        margin: 'auto'
    }
}));
