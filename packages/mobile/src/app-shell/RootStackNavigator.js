import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import MorpherDrawerNavigator from './MorpherDrawerNavigator';
import MorpherResponsesPage from '../pages/MorpherResponsesPage/MorpherResponsesPage';
import MorpherResponsePage from '../pages/MorpherResponsePage/MorpherResponsePage';

import AffixTypeListSelectorPage from '../pages/AffixTypeListSelectorPage/AffixTypeListSelectorPage';

const Stack = createNativeStackNavigator();

export default function RootStackNavigator() {
  const [t] = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MorpherDrawer"
        component={MorpherDrawerNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MorpherResponses"
        component={MorpherResponsesPage}
        options={{
          headerBackTitle: t('backButton.Label', { ns: 'application' }),
          title: t('Title', { ns: 'responses' })
        }}
      />

      <Stack.Screen
        name="MorpherResponse"
        component={MorpherResponsePage}
        options={{
          headerBackTitle: t('backButton.Label', { ns: 'application' }),
          title: t('Title', { ns: 'response' })
        }}
      />

      <Stack.Screen
        name="AffixTypeListSelector"
        component={AffixTypeListSelectorPage}
        options={{
          headerBackTitle: t('backButton.Label', { ns: 'application' }),
          title: t('Title', { ns: 'affixTypes' })
        }}
      />
    </Stack.Navigator>
  );
}
