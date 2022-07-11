import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { object, string } from 'yup';

import { Button, FormControl, Input, ScrollView, Spinner, Text } from 'native-base';

import useApiUrl from '../../hooks/useApiUrl';

import { analyze } from '@szg/morpher-client-shared';

export default function MorphologicalAnalysisPage({ navigation }) {
  const [t] = useTranslation('morphologicalAnalysis');
  const [apiUrl] = useApiUrl();

  const analyzeWord = ({ input }, { setSubmitting }) => {
    analyze(input.toLowerCase(), apiUrl)
      .then(analysisResponses =>
        navigation.navigate('MorpherResponses', {
          responses: analysisResponses
        })
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <ScrollView p="4">
      <Formik
        initialValues={{ input: '' }}
        validationSchema={object({
          input: string().required(t('input.RequiredError'))
        })}
        onSubmit={analyzeWord}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <>
            <FormControl isFullWidth>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                variant="rounded"
                placeholder={t('input.Label')}
                value={values.input}
                onChangeText={handleChange('input')}
                onBlur={handleBlur('input')}
                testID="lemma-input"
              />
            </FormControl>

            <Button
              disabled={isSubmitting || !!errors.input || values.input.length === 0}
              onPress={handleSubmit}
              style={styles.submitButton}
              testID="submit-button"
            >
              <Text testID="submit-button-text">{t('button.Label')}</Text>
            </Button>

            {
              isSubmitting && (
                <Spinner
                  size="lg"
                  style={styles.spinner}
                  testID="loading-spinner"
                />
              )
            }
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

MorphologicalAnalysisPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20
  },
  spinner: {
    marginTop: 50
  }
});
