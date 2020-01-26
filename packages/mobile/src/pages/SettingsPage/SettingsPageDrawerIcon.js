import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

export default function SettingsPageDrawerIcon({ color }) {
  return (
    <Icon
      type="MaterialIcons"
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
