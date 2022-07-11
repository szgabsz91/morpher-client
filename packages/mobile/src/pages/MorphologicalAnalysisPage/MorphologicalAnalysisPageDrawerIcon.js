import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function MorphologicalAnalysisPageDrawerIcon({ color }) {
  return (
    <Icon
      as={MaterialIcons}
      name="keyboard-arrow-left"
      style={{ color }}
      testID="icon"
    />
  );
}

MorphologicalAnalysisPageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
