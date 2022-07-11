import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { FormControl, IconButton, Input, Text, WarningOutlineIcon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function ApiUrlEditor({ currentApiUrl, onCommit }) {
  const [t] = useTranslation('settings');
  const [apiUrl, setApiUrl] = useState(currentApiUrl);

  useEffect(() => {
    setApiUrl(currentApiUrl);
  }, [currentApiUrl]);

  return (
    <>
      <Text
        style={styles.paragraph}
        testID="api-url-editor-text"
      >
        {t('ApiUrlEditorText')}
      </Text>

      <FormControl
        isInvalid={apiUrl.length === 0}
        isFullWidth
      >
        <FormControl.Label>{t('apiUrl.Label')}</FormControl.Label>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={t('apiUrl.Label')}
          value={apiUrl}
          onChangeText={setApiUrl}
          testID="api-url-input"
        />
        {
          apiUrl.length === 0 && (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} testID="api-url-input-error">
              {t('apiUrl.ErrorMessage')}
            </FormControl.ErrorMessage>
          )
        }
      </FormControl>

      <View style={styles.inputRow}>
        <IconButton
          _icon={{
            as: MaterialIcons,
            name: 'done',
            color: 'green.700'
          }}
          borderRadius="full"
          disabled={apiUrl.length === 0 || apiUrl === currentApiUrl}
          style={styles.iconButton}
          onPress={() => onCommit(apiUrl)}
          testID="save-icon-button"
        />

        <IconButton
          _icon={{
            as: MaterialIcons,
            name: 'clear',
            color: 'red.700'
          }}
          borderRadius="full"
          disabled={apiUrl === currentApiUrl}
          style={styles.iconButton}
          onPress={() => setApiUrl(currentApiUrl)}
          testID="cancel-icon-button"
        />
      </View>
    </>
  );
}

ApiUrlEditor.propTypes = {
  currentApiUrl: PropTypes.string.isRequired,
  onCommit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 10,
    marginBottom: 30
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  iconButton: {
    marginRight: 10
  }
});
