import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function HomePageTitle({ color }) {
  const [t] = useTranslation('home');

  return (
    <Text
      style={{ color }}
      testID="title"
    >
      {t('Title')}
    </Text>
  );
}

HomePageTitle.propTypes = {
  color: PropTypes.string
};
