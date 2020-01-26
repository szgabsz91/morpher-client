import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

import morpherLogo from '@szg/morpher-client-shared/assets/morpher.png';

export default function MorpherDrawer(props) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={morpherLogo}
            style={styles.logo}
            testID="logo-image"
          />
        </View>

        <DrawerItems
          {...props}
          itemStyle={styles.drawerItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 80,
    marginTop: 20,
    marginBottom: 30
  },
  drawerItem: {
    marginVertical: 5,
    paddingVertical: 10
  }
});
