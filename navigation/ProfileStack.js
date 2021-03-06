import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Profile, EditProfile } from '../screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{
          headerStyle: { backgroundColor: '#89b337' },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
