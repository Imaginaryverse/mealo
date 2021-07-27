import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { Home } from '../screens';
import MealPlanStack from './MealPlanStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name='ios-home-outline' size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Mealplanner'
        component={MealPlanStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='ios-restaurant-outline' size={25} />
          ),
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='ios-heart-outline' size={25} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='ios-person-outline' size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
