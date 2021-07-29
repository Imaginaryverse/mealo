import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FavoritesCard } from '../components';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_RECIPES_BY_IDS } from '../queries/DBqueries';

const Favorites = ({ navigation }) => {
  const favorites = useSelector(state => state.user.favoriteRecipes) || [];
  const { loading, error, data } = useQuery(GET_RECIPES_BY_IDS, {
    variables: { ids: favorites },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
        <ActivityIndicator size={80} color='#89b337' />
      </View>
    );
  }

  if (data && !data.getRecipesByIds.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No favorites saved</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && data.getRecipesByIds && (
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={data.getRecipesByIds}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <FavoritesCard recipe={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  loadingContainer: {
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
  },
});

export default Favorites;
