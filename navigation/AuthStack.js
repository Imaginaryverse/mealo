import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Login, Signup } from '../screens';
import BottomTabNavigator from './BottomTabs';

const Stack = createStackNavigator();

const AuthStack = ({ user, setUser, setLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen
        name='Login'
        component={Login}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
      <Stack.Screen
        name='Signup'
        component={Signup}
        setUser={setUser}
        setLoggedIn={setLoggedIn}
      />
      <Stack.Screen name='Home' component={BottomTabNavigator} user={user} />
    </Stack.Navigator>
  );
};

export default AuthStack;
