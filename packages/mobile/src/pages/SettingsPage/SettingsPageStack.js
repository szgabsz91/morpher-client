import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import SettingsPage from './SettingsPage';
import SettingsPageDrawerIcon from './SettingsPageDrawerIcon';
import SettingsPageTitle from './SettingsPageTitle';

const SettingsPageStack = createStackNavigator({
  Settings: {
    screen: SettingsPage
  }
});

SettingsPageStack.navigationOptions = {
  drawerIcon: ({ tintColor }) => <SettingsPageDrawerIcon color={tintColor} />,
  drawerLabel: ({ tintColor }) => <SettingsPageTitle color={tintColor} />
};

export default SettingsPageStack;
