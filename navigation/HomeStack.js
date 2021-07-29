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
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Recipe'
        component={Recipe}
        options={{
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
