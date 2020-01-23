import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

export default function InflectionGenerationPageDrawerIcon({ color }) {
  return (
    <Icon
      type="MaterialIcons"
      name="keyboard-arrow-right"
      style={{ color }}
      testID="icon"
    />
  );
}

InflectionGenerationPageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
