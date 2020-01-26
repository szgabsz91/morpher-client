import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { object, string } from 'yup';

import { Button, Container, Content, Form, Icon, Input, Item, Label, Spinner, Text } from 'native-base';

import MenuIconButton from '../../components/MenuIconButton/MenuIconButton';
import MorphologicalAnalysisPageTitle from './MorphologicalAnalysisPageTitle';

import useApiUrl from '../../hooks/useApiUrl';

import { analyze } from '@szg/morpher-client-shared';

export default function MorphologicalAnalysisPage({ navigation }) {
  const [t] = useTranslation('morphologicalAnalysis');
  const [apiUrl] = useApiUrl();

  const analyzeWord = ({ input }, { setSubmitting }) => {
    analyze(input, apiUrl)
      .then(analysisResponses =>
        navigation.navigate('MorpherResponses', {
          responses: analysisResponses
        })
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Container>
      <Content padder>
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
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form>
              <Item
                floatingLabel
                last
                error={touched.input && !!errors.input}
              >
                <Label testID="lemma-label">{t('input.Label')}</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.input}
                  onChangeText={handleChange('input')}
                  onBlur={handleBlur('input')}
                  testID="lemma-input"
                />
                {
                  touched.input && !!errors.input && (
                    <Icon
                      type="MaterialIcons"
                      name="error-outline"
                      testID="lemma-warning-icon"
                    />
                  )
                }
              </Item>

              <Button
                full
                rounded
                disabled={isSubmitting}
                onPress={handleSubmit}
                style={styles.submitButton}
                testID="submit-button"
              >
                <Text testID="submit-button-text">{t('button.Label')}</Text>
              </Button>

              {
                isSubmitting && (
                  <Spinner
                    color="green"
                    testID="loading-spinner"
                  />
                )
              }
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

MorphologicalAnalysisPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

MorphologicalAnalysisPage.navigationOptions = props => ({
  headerTitle: () => <MorphologicalAnalysisPageTitle />,
  headerLeft: () => <MenuIconButton onButtonPressed={props.navigation.toggleDrawer} />
});

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20
  }
});
