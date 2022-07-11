import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'native-base';

export default function MenuIconButton({ onButtonPressed }) {
  return (
    <Button
      onPress={onButtonPressed}
      testID="button"
    >
      <Icon
        type="MaterialIcons"
        name="menu"
        testID="icon"
      />
    </Button>
  );
}

MenuIconButton.propTypes = {
  onButtonPressed: PropTypes.func.isRequired
};
