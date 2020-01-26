import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function MorpherResponsePageHeaderTitle() {
  const [t] = useTranslation('response');

  return (
    <Text testID="title">{t('Title')}</Text>
  );
}

MorpherResponsePageHeaderTitle.propTypes = {};
