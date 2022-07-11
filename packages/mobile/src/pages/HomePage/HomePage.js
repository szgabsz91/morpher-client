import React from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, ScrollView, Text } from 'native-base';

const morpherLogo = require('../../../assets/morpher.png');

export default function HomePage() {
  const [t] = useTranslation('home');

  return (
    <ScrollView p="4">
      <View style={styles.logoContainer}>
        <Image
          source={morpherLogo}
          testID="logo-image"
        />
      </View>

      <Text
        style={styles.paragraph}
        testID="paragraph"
      >
        {t('Paragraph1')}
      </Text>

      <Text
        style={styles.paragraph}
        testID="paragraph"
      >
        {t('Paragraph2')}
      </Text>

      <Text
        style={styles.paragraph}
        testID="paragraph"
      >
        {t('Resources')}
      </Text>

      <View style={styles.resourceList}>
        <Button
          block
          style={styles.resource}
          onPress={() => Linking.openURL('https://github.com/szgabsz91/morpher')}
          testID="morpher-button"
        >
          <Text testID="morpher-button-text">{t('application:Title')}</Text>
        </Button>

        <Button
          block
          style={styles.resource}
          onPress={() => Linking.openURL('https://github.com/szgabsz91/morpher-api')}
          testID="morpher-api-button"
        >
          <Text testID="morpher-api-button-text">{t('MorpherAPI')}</Text>
        </Button>

        <Button
          block
          style={styles.resource}
          onPress={() => Linking.openURL('https://github.com/szgabsz91/morpher-client')}
          testID="morpher-client-button"
        >
          <Text testID="morpher-client-button-text">{t('MorpherClient')}</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

HomePage.propTypes = {};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10
  },
  resourceList: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20
  },
  resource: {
    marginTop: 5,
    marginBottom: 5
  }
});
