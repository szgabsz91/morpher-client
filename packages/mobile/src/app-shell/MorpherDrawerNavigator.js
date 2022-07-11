import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

import MorpherDrawer from './MorpherDrawer';

import HomePage from '../pages/HomePage/HomePage';
import HomePageDrawerIcon from '../pages/HomePage/HomePageDrawerIcon';
import HomePageTitle from '../pages/HomePage/HomePageTitle';

import InflectionGenerationPage from '../pages/InflectionGenerationPage/InflectionGenerationPage';
import InflectionGenerationPageDrawerIcon from '../pages/InflectionGenerationPage/InflectionGenerationPageDrawerIcon';
import InflectionGenerationPageTitle from '../pages/InflectionGenerationPage/InflectionGenerationPageTitle';

import MorphologicalAnalysisPage from '../pages/MorphologicalAnalysisPage/MorphologicalAnalysisPage';
import MorphologicalAnalysisPageDrawerIcon from '../pages/MorphologicalAnalysisPage/MorphologicalAnalysisPageDrawerIcon';
import MorphologicalAnalysisPageTitle from '../pages/MorphologicalAnalysisPage/MorphologicalAnalysisPageTitle';

import SettingsPage from '../pages/SettingsPage/SettingsPage';
import SettingsPageDrawerIcon from '../pages/SettingsPage/SettingsPageDrawerIcon';
import SettingsPageTitle from '../pages/SettingsPage/SettingsPageTitle';

const Drawer = createDrawerNavigator();

export default function MorpherDrawerNavigator() {
  const [t] = useTranslation();

  return (
    <Drawer.Navigator
      detachInactiveScreens={true}
      screenOptions={{
        drawerType: 'front'
      }}
      initialRouteName="Home"
      drawerContent={(props) => <MorpherDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          drawerIcon: ({ color }) => <HomePageDrawerIcon color={color} />,
          drawerLabel: ({ color }) => <HomePageTitle color={color} />,
          title: t('Title', { ns: 'home' })
        }}
      />

      <Drawer.Screen
        name="InflectionGeneration"
        component={InflectionGenerationPage}
        options={{
          drawerIcon: ({ color }) => <InflectionGenerationPageDrawerIcon color={color} />,
          drawerLabel: ({ color }) => <InflectionGenerationPageTitle color={color} />,
          title: t('Title', { ns: 'inflectionGeneration' })
        }}
      />

      <Drawer.Screen
        name="MorphologicalAnalysis"
        component={MorphologicalAnalysisPage}
        options={{
          drawerIcon: ({ color }) => <MorphologicalAnalysisPageDrawerIcon color={color} />,
          drawerLabel: ({ color }) => <MorphologicalAnalysisPageTitle color={color} />,
          title: t('Title', { ns: 'morphologicalAnalysis' })
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          drawerIcon: ({ color }) => <SettingsPageDrawerIcon color={color} />,
          drawerLabel: ({ color }) => <SettingsPageTitle color={color} />,
          title: t('Title', { ns: 'settings' })
        }}
      />
    </Drawer.Navigator>
  );
}
