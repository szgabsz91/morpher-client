import React from 'react';
import PropTypes from 'prop-types';

import { Box, FlatList } from 'native-base';

import MorpherResponse from './MorpherResponse';

export default function MorpherResponsesPage({ navigation, route }) {
  const { responses } = route.params;

  const onResponseSelected = response => {
    navigation.navigate('MorpherResponse', {
      response
    });
  };

  return (
    <Box p="4">
      <FlatList
        data={responses}
        renderItem={({ item, index }) => (
          <MorpherResponse
            key={index}
            response={item}
            isLastResponse={index === responses.length - 1}
            onResponseSelected={() => onResponseSelected(item)}
          />
        )}
      />
    </Box>
  );
}

MorpherResponsesPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      responses: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
};
