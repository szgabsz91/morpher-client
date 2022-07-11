import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView } from 'native-base';

import ApiUrlEditor from './components/ApiUrlEditor/ApiUrlEditor';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';

import useApiUrl from '../../hooks/useApiUrl';

export default function SettingsPage() {
  const [, i18n] = useTranslation('settings');
  const [apiUrl, setApiUrl] = useApiUrl();

  const onCommitApiUrl = async newApiUrl => {
    await AsyncStorage.setItem('apiUrl', newApiUrl);
    setApiUrl(newApiUrl);
  };

  return (
    <ScrollView p="4">
      <ApiUrlEditor
        currentApiUrl={apiUrl}
        onCommit={onCommitApiUrl}
      />

      <LanguageSelector
        style={styles.languageSelector}
        onLanguageSelected={languageCode => i18n.changeLanguage(languageCode)}
      />
    </ScrollView>
  );
}

SettingsPage.propTypes = {};

const styles = StyleSheet.create({
  languageSelector: {
    marginTop: 50
  }
});
