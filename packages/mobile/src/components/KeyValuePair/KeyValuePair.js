import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from 'native-base';

export default function KeyValuePair({
  header,
  subheader,
  isHeaderBold = false,
  isSubheaderItalic = false,
  style
}) {
  return (
    <View
      style={[styles.row, style]}
      testID="row"
    >
      <Text
        mb="1"
        style={[styles.header, isHeaderBold && styles.headerBold]}
        testID="header"
      >
        {header}
      </Text>

      {
        subheader && (
          <Text
            style={[
              styles.subheader,
              isSubheaderItalic && styles.subheaderItalic
            ]}
            testID="subheader"
          >
            {subheader}
          </Text>
        )
      }
    </View>
  );
}

KeyValuePair.propTypes = {
  header: PropTypes.any.isRequired,
  subheader: PropTypes.any,
  isHeaderBold: PropTypes.bool,
  isSubheaderItalic: PropTypes.bool,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column'
  },
  header: {
    alignSelf: 'flex-start',
  },
  headerBold: {
    fontWeight: 'bold'
  },
  subheader: {
    alignSelf: 'flex-start',
    color: '#555'
  },
  subheaderItalic: {
    fontStyle: 'italic'
  }
});
