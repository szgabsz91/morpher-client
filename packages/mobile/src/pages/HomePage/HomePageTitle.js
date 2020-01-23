import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function HomePageHeaderTitle({ color }) {
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

HomePageHeaderTitle.propTypes = {
  color: PropTypes.string
};
