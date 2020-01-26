import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Text } from 'native-base';

import Flag from '../Flag/Flag';

import enFlag from '@szg/morpher-client-shared/assets/flags/en.png';
import huFlag from '@szg/morpher-client-shared/assets/flags/hu.png';

const supportedLanguageCodes = ['en', 'hu'];
const flags = {
  en: enFlag,
  hu: huFlag
};

export default function LanguageSelector({ style, onLanguageSelected }) {
  const [t] = useTranslation('settings');

  return (
    <>
      <Text
        style={[styles.paragraph, style]}
        testID="language-change-text"
      >
        {t('LanguageChangeText')}
      </Text>

      <View style={[styles.paragraph, styles.flagContainer]}>
        {
          supportedLanguageCodes.map(supportedLanguageCode => (
            <Flag
              key={supportedLanguageCode}
              flagImage={flags[supportedLanguageCode]}
              onLanguageSelected={() => onLanguageSelected(supportedLanguageCode)}
              style={styles.flag}
            />
          ))
        }
      </View>
    </>
  );
}

LanguageSelector.propTypes = {
  style: PropTypes.object,
  onLanguageSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 10,
    marginBottom: 10
  },
  flagContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flag: {
    marginHorizontal: 10
  }
});
