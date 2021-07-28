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
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        keyboardHidesTabBar: true,
        animationEnabled: false,
        style: {
          backgroundColor: '#89b337',
          height: 55,
          paddingTop: 5,
          paddingBottom: 5,
        },
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
              color={focused ? 'white' : 'black'}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name='Meal Plan'
        component={MealPlanStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'ios-restaurant' : 'ios-restaurant-outline'}
              size={25}
              color={focused ? 'white' : 'black'}
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
              color={focused ? 'white' : 'black'}
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
              color={focused ? 'white' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
