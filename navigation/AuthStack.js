import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Login, Signup, Onboard } from '../screens';
import BottomTabNavigator from './BottomTabs';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Signup'
        component={Signup}
        options={{
          title: 'Create Account',
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Onboard'
        component={Onboard}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Home'
        component={BottomTabNavigator}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
