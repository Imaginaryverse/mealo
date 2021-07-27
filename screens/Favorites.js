import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FavoritesCard } from '../components';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_RECIPES_BY_IDS } from '../queries/DBqueries';

const Favorites = ({ navigation }) => {
  const favorites = useSelector(state => state.user.favoriteRecipes) || [];
  const { loading, error, data } = useQuery(GET_RECIPES_BY_IDS, {
    variables: { ids: favorites },
  });

  return (
    <View style={styles.container}>
      {data && data.getRecipesByIds ? (
        <View>
          <Text>Your Favorite Recipes</Text>
          <FlatList
            data={data.getRecipesByIds}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <FavoritesCard recipe={item} navigation={navigation} />
            )}
          />
        </View>
      ) : (
        <View>
          <Text>No favorites!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Favorites;
