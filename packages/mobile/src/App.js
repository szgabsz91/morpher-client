import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';

import RootStackNavigator from './app-shell/RootStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootStackNavigator />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
