import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MealPlanner, Swap, Recipe } from '../screens';
import { FAB } from '../components';

const Stack = createStackNavigator();

const MealPlanStack = () => {
  return (
    <Stack.Navigator initialRouteName={'MealPlanner'}>
      <Stack.Screen
        headerMode='screen'
        name='MealPlanner'
        component={MealPlanner}
        options={{
          title: 'Meal Plan',
          //headerRight: () => <FAB handlePress={handlePress} />,
        }}
      />
      <Stack.Screen name='Recipe' component={Recipe} headerMode='screen' />
      <Stack.Screen name='Swap' component={Swap} headerMode='screen' />
    </Stack.Navigator>
  );
};

export default MealPlanStack;
