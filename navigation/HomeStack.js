import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home, Recipe } from '../screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Recipe' component={Recipe} />
    </Stack.Navigator>
  );
};

export default HomeStack;
