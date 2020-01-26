import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { array, object, string } from 'yup';

import { Button, Container, Content, Form, Icon, Input, Item, Label, Spinner, Text } from 'native-base';

import MenuIconButton from '../../components/MenuIconButton/MenuIconButton';
import InflectionGenerationPageTitle from './InflectionGenerationPageTitle';

import AffixTypeListSelector from '../AffixTypeListSelectorPage/AffixTypeListSelector';

import useApiUrl from '../../hooks/useApiUrl';

import { inflect } from '@szg/morpher-client-shared';

export default function InflectionGenerationPage({ navigation }) {
  const [t] = useTranslation('inflectionGeneration');
  const [apiUrl] = useApiUrl();

  const inflectWord = ({ input, affixTypes }, { setSubmitting }) => {
    inflect(input, affixTypes, apiUrl)
      .then(inflectionResponses =>
        navigation.navigate('MorpherResponses', {
          responses: inflectionResponses
        })
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Container>
      <Content padder>
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
            <Form>
              <Item
                floatingLabel
                error={touched.input && !!errors.input}
              >
                <Label testID="lemma-label">{t('input.Label')}</Label>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.input}
                  onChangeText={event => handleChange('input')(event)}
                  onBlur={/* istanbul ignore next */ event => handleBlur('input')(event)}
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

InflectionGenerationPage.propTypes = {
  navigation: PropTypes.object.isRequired
};

InflectionGenerationPage.navigationOptions = props => ({
  headerTitle: () => <InflectionGenerationPageTitle />,
  headerLeft: () => <MenuIconButton onButtonPressed={props.navigation.toggleDrawer} />
});

const styles = StyleSheet.create({
  affixTypeListSelector: {
    marginLeft: 15,
    marginTop: 10
  },
  submitButton: {
    marginTop: 20
  }
});
