import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import MorphologicalAnalysisPage from './MorphologicalAnalysisPage';
import MorphologicalAnalysisPageDrawerIcon from './MorphologicalAnalysisPageDrawerIcon';
import MorphologicalAnalysisPageTitle from './MorphologicalAnalysisPageTitle';

import MorpherResponsesPage from '../MorpherResponsesPage/MorpherResponsesPage';
import MorpherResponsePage from '../MorpherResponsePage/MorpherResponsePage';

const MorphologicalAnalysisPageStack = createStackNavigator({
  MorphologicalAnalysis: {
    screen: MorphologicalAnalysisPage
  },
  MorpherResponses: {
    screen: MorpherResponsesPage
  },
  MorpherResponse: {
    screen: MorpherResponsePage
  }
});

MorphologicalAnalysisPageStack.navigationOptions = {
  drawerIcon: ({ tintColor }) => <MorphologicalAnalysisPageDrawerIcon color={tintColor} />,
  drawerLabel: ({ tintColor }) => <MorphologicalAnalysisPageTitle color={tintColor} />
};

export default MorphologicalAnalysisPageStack;
