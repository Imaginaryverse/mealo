import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabs';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {loggedIn ? (
          <BottomTabNavigator user={user} />
        ) : (
          <AuthStack setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
        )}
      </NavigationContainer>
    </ApolloProvider>
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
