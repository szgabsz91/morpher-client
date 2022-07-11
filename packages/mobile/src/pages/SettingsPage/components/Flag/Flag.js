import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from 'native-base';

export default function Flag({ flagImage, onLanguageSelected, style }) {
  return (
    <Button
      variant="unstyled"
      onPress={onLanguageSelected}
      style={style}
      testID="flag-button"
    >
      <Image
        source={flagImage}
        testID="flag-image"
      />
    </Button>
  );
}

Flag.propTypes = {
  flagImage: PropTypes.number.isRequired,
  onLanguageSelected: PropTypes.func.isRequired,
  style: PropTypes.object
};
