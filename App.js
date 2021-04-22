import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './src/routes/HomeStackNavigator';
import {useStatusBar} from './src/hooks';
import {ARContextProvider} from './src/context/ARContext';

export default function App() {
  useStatusBar();
  return (
    <ARContextProvider>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </ARContextProvider>
  );
}
