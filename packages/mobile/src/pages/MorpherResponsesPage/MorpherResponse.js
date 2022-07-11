import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Icon, Progress } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';

export default function MorpherResponse({ response, isLastResponse, onResponseSelected }) {
  const [t] = useTranslation('responses');

  const isAnalysis = response.mode === 'ANALYSIS';

  return (
    <TouchableOpacity
      borderBottomWidth="1"
      style={styles.listItemRow}
      onPress={onResponseSelected}
      testID="list-item"
    >
      <Box
        borderBottomWidth={isLastResponse ? '0' : '1'}
        style={styles.listItemRowWrapper}
        borderColor="coolGray.300"
        pb="4"
        pt="4"
      >
        <Box style={styles.listItemRowContent}>
          <KeyValuePair
            header={t('affixTypes:Sample', {
              baseForm: response.input,
              inflectedForm: response.output
            })}
            subheader={isAnalysis && t('AffixTypes', { count: response.steps.length })}
            isSubheaderItalic
          />

          <Progress
            value={100 * response.aggregatedWeight}
            bg="coolGray.300"
            style={styles.progressBar}
            testID="progress-bar"
          />
        </Box>

        <Icon
          as={MaterialIcons}
          name="chevron-right"
          style={styles.chevronIcon}
          testID="chevron-icon"
        />
      </Box>
    </TouchableOpacity>
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
  isLastResponse: PropTypes.bool.isRequired,
  onResponseSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  listItemRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemRowWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemRowContent: {
    flex: 1,
  },
  progressBar: {
    flex: 1,
    marginTop: 16
  },
  chevronIcon: {
    color: '#0087fa'
  }
});
