import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

export default function MorphologicalAnalysisPageDrawerIcon({ color }) {
  return (
    <Icon
      type="MaterialIcons"
      name="keyboard-arrow-left"
      style={{ color }}
      testID="icon"
    />
  );
}

MorphologicalAnalysisPageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
