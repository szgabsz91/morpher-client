import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

export default function HomePageDrawerIcon({ color }) {
  return (
    <Icon
      type="MaterialIcons"
      name="home"
      style={{ color }}
      testID="icon"
    />
  );
}

HomePageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
