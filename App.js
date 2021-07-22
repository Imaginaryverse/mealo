import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabs';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { userStore } from './redux/store';

console.log(`${new Date().toLocaleTimeString()}: Saved...`);

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://limitless-badlands-33344.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={userStore}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {loggedIn ? <BottomTabNavigator /> : <AuthStack />}
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('App', () => App);
