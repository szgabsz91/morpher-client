import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function InflectionGenerationPageTitle({ color }) {
  const [t] = useTranslation('inflectionGeneration');

  return (
    <Text
      style={{ color }}
      testID="title"
    >
      {t('Title')}
    </Text>
  );
}

InflectionGenerationPageTitle.propTypes = {
  color: PropTypes.string
};
