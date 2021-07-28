import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { Home } from '../screens';
import MealPlanStack from './MealPlanStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        navigation={navigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'ios-home' : 'ios-home-outline'}
              size={30}
              color={focused ? 'red' : 'black'}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name='Mealplanner'
        component={MealPlanStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'ios-restaurant' : 'ios-restaurant-outline'}
              size={25}
              color={focused ? 'red' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'ios-heart' : 'ios-heart-outline'}
              size={25}
              color={focused ? 'red' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'ios-person' : 'ios-person-outline'}
              size={25}
              color={focused ? 'red' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
