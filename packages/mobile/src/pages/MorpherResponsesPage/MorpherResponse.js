import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Bar as ProgressBar } from 'react-native-progress';

import { Left, Icon, ListItem, Right } from 'native-base';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';

export default function MorpherResponse({ response, onResponseSelected }) {
  const [t] = useTranslation('responses');

  const isAnalysis = response.mode === 'ANALYSIS';

  return (
    <ListItem
      button
      onPress={onResponseSelected}
      testID="list-item"
    >
      <Left style={styles.affixTypeContent}>
        <KeyValuePair
          header={t('affixTypes:Sample', {
            baseForm: response.input,
            inflectedForm: response.output
          })}
          subheader={isAnalysis && t('AffixTypes', { count: response.steps.length })}
          isSubheaderItalic
        />

        <ProgressBar
          progress={response.aggregatedWeight}
          width={null}
          style={styles.progressBar}
          testID="progress-bar"
        />
      </Left>

      <Right>
        <Icon
          name="arrow-forward"
          testID="arrow-icon"
        />
      </Right>
    </ListItem>
  );
}

MorpherResponse.propTypes = {
  response: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    input: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    pos: PropTypes.shape({
      affixType: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired
    }).isRequired,
    affixTypeChainProbability: PropTypes.number.isRequired,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        input: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired,
        affixType: PropTypes.string.isRequired,
        affixTypeProbability: PropTypes.number.isRequired,
        outputWordProbability: PropTypes.number.isRequired,
        aggregatedProbability: PropTypes.number.isRequired
      })
    ).isRequired,
    normalizedAffixTypeChainProbability: PropTypes.number.isRequired,
    aggregatedWeight: PropTypes.number.isRequired
  }).isRequired,
  onResponseSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  affixTypeContent: {
    flex: 1,
    flexDirection: 'column'
  },
  progressBar: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10
  }
});
