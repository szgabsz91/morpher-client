import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { array, object, string } from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { getSupportedAffixTypes, inflect } from '@szg/morpher-client-shared';

import AffixTypeListSelector from './components/AffixTypeListSelector/AffixTypeListSelector';
import MorpherResponses from '../../components/MorpherResponses/MorpherResponses';

const useAffixTypes = () => {
    const [affixTypes, setAffixTypes] = useState([]);

    useEffect(() => {
        getSupportedAffixTypes()
            .then(affixTypes => setAffixTypes(affixTypes));
    }, []);
    
    return { affixTypes };
};

export default function InflectionGenerationPage() {
    const [t] = useTranslation('inflectionGeneration');
    const [inflectionResponses, setInflectionResponses] = useState([]);
    const classes = useStyles();
    const { affixTypes } = useAffixTypes();

    const inflectWord = ({ input, affixTypes }, { setSubmitting }) => {
        inflect(input, affixTypes)
            .then(setInflectionResponses)
            .finally(() => setSubmitting(false));
    };

    if (affixTypes.length === 0) {
        return (
            <div
                className={classes.pageLoadingContainer}
                data-testid="page-loading-container"
            >
                <CircularProgress
                    size={80}
                    className={classes.pageLoading}
                    data-testid="page-loading"
                />
            </div>
        );
    }

    return (
        <>
            <h2 data-testid="page-title">{t('Title')}</h2>

            <Formik
                initialValues={{ input: '', affixTypes: [] }}
                validationSchema={object({
                    input: string().required(),
                    affixTypes: array().of(string()).min(1)
                })}
                onSubmit={inflectWord}
            >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldTouched,
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
                        className={classes.formControl}
                        data-testid="input-field"
                    />

                    <AffixTypeListSelector
                        name="affixTypes"
                        value={values.affixTypes}
                        error={touched.affixTypes && !!errors.affixTypes}
                        handleChange={handleChange}
                        setFieldTouched={setFieldTouched}
                        affixTypes={affixTypes}
                        className={classes.formControl}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        className={classes.formControl}
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

            {inflectionResponses.length > 0 && <MorpherResponses responses={inflectionResponses} />}
        </>
    );
}

InflectionGenerationPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    pageLoadingContainer: {
        textAlign: 'center'
    },
    pageLoading: {
        marginTop: 100
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        marginTop: 20,
        marginBottom: 20
    },
    loading: {
        margin: 'auto'
    }
}));
