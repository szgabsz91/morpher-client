import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Box, FlatList } from 'native-base';

import MorpherStep from './MorpherStep';

export default function MorpherResponsePage({ route }) {
  const [t] = useTranslation('responses');
  const response = route.params.response;

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
    <Box p="4">
      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <MorpherStep
            key={index}
            step={item}
            style={styles.row}
          />
        )}
      />
    </Box>
  );
}

MorpherResponsePage.propTypes = {
  route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 20
  }
});
