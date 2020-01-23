import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import InflectionGenerationPage from './InflectionGenerationPage';
import InflectionGenerationPageDrawerIcon from './InflectionGenerationPageDrawerIcon';
import InflectionGenerationPageTitle from './InflectionGenerationPageTitle';

import AffixTypeListSelectorPage from '../AffixTypeListSelectorPage/AffixTypeListSelectorPage';

import MorpherResponsesPage from '../MorpherResponsesPage/MorpherResponsesPage';
import MorpherResponsePage from '../MorpherResponsePage/MorpherResponsePage';

const InflectionGenerationPageStack = createStackNavigator({
  InflectionGeneration: {
    screen: InflectionGenerationPage
  },
  AffixTypeListSelector: {
    screen: AffixTypeListSelectorPage
  },
  MorpherResponses: {
    screen: MorpherResponsesPage
  },
  MorpherResponse: {
    screen: MorpherResponsePage
  }
});

InflectionGenerationPageStack.navigationOptions = {
  drawerIcon: ({ tintColor }) => <InflectionGenerationPageDrawerIcon color={tintColor} />,
  drawerLabel: ({ tintColor }) => <InflectionGenerationPageTitle color={tintColor} />
};

export default InflectionGenerationPageStack;
