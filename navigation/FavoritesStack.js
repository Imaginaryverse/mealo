import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Favorites, Recipe } from '../screens';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Favorites'}>
      <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={{ headerShown: true, title: 'Favorites' }}
      />
      <Stack.Screen name='Recipe' component={Recipe} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
