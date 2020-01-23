import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from 'native-base';

export default function AffixTypeListSelector({
  value,
  error = false,
  name,
  handleChange,
  setFieldTouched,
  style,
  navigation
}) {
  const [t] = useTranslation('affixTypes');

  const emptyMessageText = (
    <Text
      style={[styles.value, error && styles.error]}
      testID="empty-message-text"
    >
      {t('EmptyMessage')}
    </Text>
  );

  const affixTypeTexts = value.map(affixType => (
    <Text
      key={affixType}
      style={styles.value}
      testID="affix-type-text"
    >
      {t(`${affixType}.DisplayName`)}
    </Text>
  ));

  const onReceiveAffixTypeList = selectedAffixTypes => {
    setFieldTouched(name, true, false);
    handleChange({
      target: {
        id: name,
        value: selectedAffixTypes
      }
    });
  };

  const editAffixTypeList = () => {
    navigation.navigate('AffixTypeListSelector', {
      selectedAffixTypes: value,
      onReceiveAffixTypeList
    });
  };

  return (
    <View
      style={[styles.rowContainer, style]}
      testID="row-container"
    >
      <Text
        style={[styles.label, error && styles.error]}
        testID="label"
      >
        {t('Label')}
      </Text>

      <View style={styles.valueContainer}>
        {
          value.length === 0 ?
            emptyMessageText :
            affixTypeTexts
        }

        <View style={styles.buttonContainer}>
          <Button
            onPress={editAffixTypeList}
            testID="edit-button"
          >
            <Icon
              type="MaterialIcons"
              name="edit"
            />
          </Button>

          {
            error && (
              <Icon
                type="MaterialIcons"
                name="error-outline"
                style={[styles.error, styles.errorIcon]}
                testID="warning-icon"
              />
            )
          }
        </View>
      </View>
    </View>
  );
}

AffixTypeListSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  style: PropTypes.object,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  label: {
    marginRight: 5,
    lineHeight: 30
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  value: {
    lineHeight: 30
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  error: {
    color: '#db423a'
  },
  errorIcon: {
    marginLeft: 10
  }
});
