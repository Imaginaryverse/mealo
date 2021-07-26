import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Settings } from '../screens';
import MealPlanStack from './MealPlanStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Mealplanner' component={MealPlanStack} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
