import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Container, Content, List } from 'native-base';

import MorpherResponsePageTitle from './MorpherResponsePageTitle';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';
import BackButton from '../../components/BackButton/BackButton';
import MorpherStep from './MorpherStep';

export default function MorpherResponsePage({ navigation }) {
  const [t] = useTranslation('responses');
  const response = navigation.getParam('response');

  const isInflection = response.mode === 'INFLECTION';
  const posStep = {
    output: isInflection ? response.input : response.output,
    affixType: response.pos.affixType,
    aggregatedProbability: response.pos.probability
  };
  const steps = isInflection ?
    [posStep, ...response.steps] :
    [...response.steps, posStep];

  return (
    <Container>
      <Content padder>
        {
          // istanbul ignore next
          process.env.NODE_ENV  === 'development' && (
            <View style={styles.keyValuePairContainer}>
              <KeyValuePair
                header={t('AffixTypeChainProbabilityHeader')}
                isHeaderBold
                subheader={response.affixTypeChainProbability}
                style={styles.row}
              />

              <KeyValuePair
                header={t('NormalizedAffixTypeChainProbabilityHeader')}
                isHeaderBold
                subheader={response.normalizedAffixTypeChainProbability}
                style={styles.row}
              />
            </View>
          )
        }

        <List>
          {
            steps.map((step, index) => (
              <MorpherStep
                key={index}
                step={step}
              />
            ))
          }
        </List>
      </Content>
    </Container>
  );
}

MorpherResponsePage.propTypes = {
  navigation: PropTypes.object.isRequired
};

MorpherResponsePage.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <MorpherResponsePageTitle />,
  headerLeft: () => <BackButton navigation={navigation} />
});

const styles = StyleSheet.create({
  keyValuePairContainer: {
    marginHorizontal: 15
  },
  row: {
    marginBottom: 20
  }
});
