import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

export default function AffixTypeListSelectorPageTitle() {
  const [t] = useTranslation('affixTypes');

  return (
    <Text testID="title">{t('Title')}</Text>
  );
}

AffixTypeListSelectorPageTitle.propTypes = {};
