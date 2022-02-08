import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {constants} from '../utils';
import {ARScene, ARSelect, CreatePath, Home} from '../screens';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={constants.HOME} component={Home} />
      <Stack.Screen name={constants.CREATEPATH} component={CreatePath} />
      <Stack.Screen name={constants.AR} component={ARSelect} />
      <Stack.Screen name={constants.ARScene} component={ARScene} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
