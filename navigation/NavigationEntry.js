import React from 'react';
import BottomTabNavigator from './BottomTabs';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const NavigationEntry = () => {
  const loggedIn = useSelector(state => state.loggedIn);
  return (
    <NavigationContainer>
      {loggedIn ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationEntry;
