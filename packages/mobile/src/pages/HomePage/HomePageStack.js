import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import HomePage from './HomePage';
import HomePageDrawerIcon from './HomePageDrawerIcon';
import HomePageTitle from './HomePageTitle';

const HomePageStack = createStackNavigator({
  Home: {
    screen: HomePage
  }
});

HomePageStack.navigationOptions = {
  drawerIcon: ({ tintColor }) => <HomePageDrawerIcon color={tintColor} />,
  drawerLabel: ({ tintColor }) => <HomePageTitle color={tintColor} />
};

export default HomePageStack;
