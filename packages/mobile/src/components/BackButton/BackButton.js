import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { HeaderBackButton } from 'react-navigation-stack';

export default function BackButton({ navigation }) {
  const [t] = useTranslation('application');

  return (
    <HeaderBackButton
      label={t('backButton.Label')}
      onPress={() => navigation.goBack()}
    />
  );
}

BackButton.props = {
  navigation: PropTypes.object.isRequired
};
