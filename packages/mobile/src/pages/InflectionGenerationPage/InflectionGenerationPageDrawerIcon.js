import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function InflectionGenerationPageDrawerIcon({ color }) {
  return (
    <Icon
      as={MaterialIcons}
      name="keyboard-arrow-right"
      style={{ color }}
      testID="icon"
    />
  );
}

InflectionGenerationPageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
