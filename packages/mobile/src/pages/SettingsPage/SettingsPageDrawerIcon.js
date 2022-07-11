import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsPageDrawerIcon({ color }) {
  return (
    <Icon
      as={MaterialIcons}
      name="settings"
      style={[styles.icon, { color }]}
      testID="icon"
    />
  );
}

SettingsPageDrawerIcon.propTypes = {
  color: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 27
  }
});
