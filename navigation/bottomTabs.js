import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { Home } from '../screens';
import MealPlanStack from './MealPlanStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Mealplanner' component={MealPlanStack} />
      <Tab.Screen name='Favorites' component={FavoritesStack} />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
