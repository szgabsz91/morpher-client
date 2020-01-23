import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function SettingsPageTitle({ color }) {
  const [t] = useTranslation('settings');

  return (
    <Text
      style={{ color }}
      testID="title"
    >
      {t('Title')}
    </Text>
  );
}

SettingsPageTitle.propTypes = {
  color: PropTypes.string
};
