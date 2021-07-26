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
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Recipe' component={Recipe} />
      <Stack.Screen name='Swap' component={Swap} />
    </Stack.Navigator>
  );
};

export default MealPlanStack;
