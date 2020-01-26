import { createDrawerNavigator } from 'react-navigation-drawer';

import MorpherDrawer from './MorpherDrawer';

import HomePageStack from '../pages/HomePage/HomePageStack';
import InflectionGenerationPageStack from '../pages/InflectionGenerationPage/InflectionGenerationPageStack';
import MorphologicalAnalysisPageStack from '../pages/MorphologicalAnalysisPage/MorphologicalAnalysisPageStack';
import SettingsPageStack from '../pages/SettingsPage/SettingsPageStack';

export default createDrawerNavigator({
  Home: {
    screen: HomePageStack
  },
  InflectionGeneration: {
    screen: InflectionGenerationPageStack
  },
  MorphologicalAnalysis: {
    screen: MorphologicalAnalysisPageStack
  },
  Settings: {
    screen: SettingsPageStack
  }
}, {
  contentComponent: MorpherDrawer,
  unmountInactiveRoutes: true
});
