import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ListItem, Text } from 'native-base';

import KeyValuePair from '../../components/KeyValuePair/KeyValuePair';

export default function MorpherStep({ step }) {
  const [t] = useTranslation('responses');

  const isPos = step.affixType.startsWith('/');
  const transformation = isPos ?
    step.output :
    t('affixTypes:Sample', {
      baseForm: step.input,
      inflectedForm: step.output
    });

  return (
    <>
      <ListItem
        itemDivider
        style={styles.header}
      >
        <Text
          style={styles.headerText}
          testID="affix-type-text"
        >
          {t(`affixTypes:${step.affixType}.DisplayName`)}
        </Text>
      </ListItem>

      <ListItem>
        <KeyValuePair
          header={t('TransformationHeader')}
          isHeaderBold
          subheader={transformation}
        />
      </ListItem>

      <ListItem>
        <KeyValuePair
          header={t('AggregatedProbabilityHeader')}
          isHeaderBold
          subheader={step.aggregatedProbability}
        />
      </ListItem>

      {
        // istanbul ignore next
        process.env.NODE_ENV === 'development' && !isPos && (
          <>
            <ListItem>
              <KeyValuePair
                header={t('AffixTypeProbabilityHeader')}
                isHeaderBold
                subheader={step.affixTypeProbability}
              />
            </ListItem>

            <ListItem>
              <KeyValuePair
                header={t('OutputWordProbabilityHeader')}
                isHeaderBold
                subheader={step.outputWordProbability}
              />
            </ListItem>
          </>
        )
      }
    </>
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
  }).isRequired
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e1e1e1'
  },
  headerText: {
    fontWeight: 'bold'
  }
});
