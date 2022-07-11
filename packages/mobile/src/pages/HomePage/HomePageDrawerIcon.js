import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomePageDrawerIcon({ color }) {
  return (
    <Icon
      as={MaterialIcons}
      name="home"
      style={{ color }}
      testID="icon"
    />
  );
}

HomePageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};
