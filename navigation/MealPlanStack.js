import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MealPlanner, Swap, Recipe } from '../screens';

const Stack = createStackNavigator();

const MealPlanStack = () => {
  return (
    <Stack.Navigator initialRouteName={'MealPlanner'}>
      <Stack.Screen
        name='MealPlanner'
        component={MealPlanner}
        options={{
          title: 'Meal Plan',
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Recipe'
        component={Recipe}
        headerMode='screen'
        options={{
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='Swap'
        component={Swap}
        headerMode='screen'
        options={{
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
    </Stack.Navigator>
  );
};

export default MealPlanStack;
