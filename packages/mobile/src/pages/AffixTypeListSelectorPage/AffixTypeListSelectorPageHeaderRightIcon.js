import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'native-base';

export default function AffixTypeListSelectorPageHeaderRightIcon({
  navigation
}) {
  const goBack = () => {
    const selectedAffixTypes = navigation.getParam('selectedAffixTypes', []);
    const onReceiveAffixTypeList = navigation.getParam('onReceiveAffixTypeList');
    onReceiveAffixTypeList(selectedAffixTypes);
    navigation.goBack();
  };

  return (
    <Button
      transparent
      onPress={goBack}
      testID="button"
    >
      <Icon
        type="MaterialIcons"
        name="done"
        testID="icon"
      />
    </Button>
  );
}

AffixTypeListSelectorPageHeaderRightIcon.propTypes = {
  navigation: PropTypes.object.isRequired
};
