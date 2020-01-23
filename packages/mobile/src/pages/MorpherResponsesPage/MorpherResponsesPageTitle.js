import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function MorpherResponsesPageTitle() {
  const [t] = useTranslation('responses');

  return (
    <Text testID="title">{t('Title')}</Text>
  );
}

MorpherResponsesPageTitle.propTypes = {};
