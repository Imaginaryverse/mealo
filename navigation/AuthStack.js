import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Login, Signup, Onboard } from '../screens';
import BottomTabNavigator from './BottomTabs';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen
        name='Onboard'
        component={Onboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
