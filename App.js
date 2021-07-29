import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { userStore } from './redux/store';

import NavigationEntry from './navigation/NavigationEntry';

const client = new ApolloClient({
  uri: 'https://limitless-badlands-33344.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Provider store={userStore}>
      <ApolloProvider client={client}>
        <NavigationEntry />
      </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('App', () => App);
