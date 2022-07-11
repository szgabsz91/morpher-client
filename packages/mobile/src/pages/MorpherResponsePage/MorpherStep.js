import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, Text } from 'native-base';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';

export default function MorpherStep({ step, style }) {
  const [t] = useTranslation('responses');

  const isPos = step.affixType.startsWith('/');
  const transformation = isPos ?
    step.output :
    t('affixTypes:Sample', {
      baseForm: step.input,
      inflectedForm: step.output
    });

  return (
    <Box style={style}>
      <Box
        p="2"
        mb="4"
        style={styles.header}
      >
        <Text
          style={styles.headerText}
          testID="affix-type-text"
        >
          {t(`affixTypes:${step.affixType}.DisplayName`)}
        </Text>
      </Box>

      <Box mb="2">
        <KeyValuePair
          header={t('TransformationHeader')}
          isHeaderBold
          subheader={transformation}
        />
      </Box>

      <Box mb="2">
        <KeyValuePair
          header={t('AggregatedProbabilityHeader')}
          isHeaderBold
          subheader={step.aggregatedProbability}
        />
      </Box>
    </Box>
  );
}

MorpherStep.propTypes = {
  step: PropTypes.shape({
    input: PropTypes.string,
    output: PropTypes.string.isRequired,
    affixType: PropTypes.string.isRequired,
    affixTypeProbability: PropTypes.number,
    outputWordProbability: PropTypes.number,
    aggregatedProbability: PropTypes.number.isRequired
  }).isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e1e1e1'
  },
  headerText: {
    fontWeight: 'bold'
  }
});
