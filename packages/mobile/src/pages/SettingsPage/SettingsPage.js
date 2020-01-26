import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

import { Container, Content } from 'native-base';

import MenuIconButton from '../../components/MenuIconButton/MenuIconButton';
import SettingsPageTitle from './SettingsPageTitle';
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
    <Container>
      <Content padder>
        <ApiUrlEditor
          currentApiUrl={apiUrl}
          onCommit={onCommitApiUrl}
        />

        <LanguageSelector
          style={styles.languageSelector}
          onLanguageSelected={languageCode => i18n.changeLanguage(languageCode)}
        />
      </Content>
    </Container>
  );
}

SettingsPage.propTypes = {};

SettingsPage.navigationOptions = props => ({
  headerTitle: () => <SettingsPageTitle />,
  headerLeft: () => <MenuIconButton onButtonPressed={props.navigation.toggleDrawer} />
});

const styles = StyleSheet.create({
  languageSelector: {
    marginTop: 50
  }
});
