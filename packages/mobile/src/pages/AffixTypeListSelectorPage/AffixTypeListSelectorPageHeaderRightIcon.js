import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function AffixTypeListSelectorPageHeaderRightIcon({
  navigation,
  route
}) {
  const goBack = () => {
    const selectedAffixTypes = route.params.selectedAffixTypes;
    console.log('Go back', selectedAffixTypes);
    const onReceiveAffixTypeList = route.params.onReceiveAffixTypeList;
    onReceiveAffixTypeList(selectedAffixTypes);
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={goBack}
      testID="button"
    >
      <Icon
        as={MaterialIcons}
        name="done"
        color="#0087fa"
        testID="icon"
      />
    </TouchableOpacity>
  );
}

AffixTypeListSelectorPageHeaderRightIcon.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      selectedAffixTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
      onReceiveAffixTypeList: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};
