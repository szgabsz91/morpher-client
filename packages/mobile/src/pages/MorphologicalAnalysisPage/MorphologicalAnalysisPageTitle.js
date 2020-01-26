import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function MorphologicalAnalysisPageTitle({ color }) {
  const [t] = useTranslation('morphologicalAnalysis');

  return (
    <Text
      style={{ color }}
      testID="title"
    >
      {t('Title')}
    </Text>
  );
}

MorphologicalAnalysisPageTitle.propTypes = {
  color: PropTypes.string
};
