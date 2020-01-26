import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Input, Item, Label, Text } from 'native-base';

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

      <View style={styles.inputRow}>
        <Item
          floatingLabel
          last
          error={apiUrl.length === 0}
          style={styles.inputItem}
        >
          <Label testID="api-url-input-label">{t('apiUrl.Label')}</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            value={apiUrl}
            onChangeText={newApiUrl => setApiUrl(newApiUrl)}
            testID="api-url-input"
          />
          {
            apiUrl.length === 0 && (
              <Icon
                type="MaterialIcons"
                name="error-outline"
                testID="api-url-warning-icon"
              />
            )
          }
        </Item>

        <Button
          small
          transparent
          disabled={apiUrl.length === 0}
          onPress={() => onCommit(apiUrl)}
          testID="save-icon-button"
        >
          <Icon
            type="MaterialIcons"
            name="done"
            testID="save-icon"
          />
        </Button>

        <Button
          small
          transparent
          disabled={apiUrl === currentApiUrl}
          onPress={() => setApiUrl(currentApiUrl)}
          testID="cancel-icon-button"
        >
          <Icon
            type="MaterialIcons"
            name="clear"
            testID="cancel-icon"
          />
        </Button>
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
    alignItems: 'center'
  },
  inputItem: {
    flex: 1
  }
});
