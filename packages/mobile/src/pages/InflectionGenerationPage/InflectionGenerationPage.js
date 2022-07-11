import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { array, object, string } from 'yup';

import { Button, FormControl, Input, ScrollView, Spinner, Text } from 'native-base';

import AffixTypeListSelector from '../AffixTypeListSelectorPage/AffixTypeListSelector';

import useApiUrl from '../../hooks/useApiUrl';

import { inflect } from '@szg/morpher-client-shared';

export default function InflectionGenerationPage({ navigation }) {
  const [t] = useTranslation('inflectionGeneration');
  const [apiUrl] = useApiUrl();

  const inflectWord = ({ input, affixTypes }, { setSubmitting }) => {
    inflect(input.toString(), affixTypes, apiUrl)
      .then(inflectionResponses =>
        navigation.navigate('MorpherResponses', {
          responses: inflectionResponses
        })
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <ScrollView p="4">
      <Formik
        initialValues={{ input: '', affixTypes: [] }}
        validationSchema={object({
          input: string().required(),
          affixTypes: array()
            .of(string())
            .min(1)
        })}
        onSubmit={inflectWord}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
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

            <AffixTypeListSelector
              name="affixTypes"
              value={values.affixTypes}
              error={touched.affixTypes && !!errors.affixTypes}
              handleChange={handleChange}
              setFieldTouched={setFieldTouched}
              navigation={navigation}
              style={styles.affixTypeListSelector}
            />

            <Button
              disabled={isSubmitting || !!errors.input || values.input.length === 0 || !!errors.affixTypes || values.affixTypes.length === 0}
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

InflectionGenerationPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  affixTypeListSelector: {
    marginLeft: 15,
    marginTop: 10
  },
  submitButton: {
    marginTop: 20
  },
  spinner: {
    marginTop: 50
  }
});
