import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile } from '../screens';
import MealPlanStack from './MealPlanStack';
import FavoritesStack from './FavoritesStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Mealplanner' component={MealPlanStack} />
      <Tab.Screen name='Favorites' component={FavoritesStack} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
