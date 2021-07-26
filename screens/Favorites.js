import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FavoritesCard } from '../components';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_RECIPES_BY_IDS } from '../queries/DBqueries';

const Favorites = ({ navigation }) => {
  const favorites = useSelector(state => state.user.favoriteRecipes);
  const { loading, error, data } = useQuery(GET_RECIPES_BY_IDS, {
    variables: { ids: favorites },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  /*   const [getRecipe, { loading, data, error }] =
    useLazyQuery(GET_RECIPE_FROM_DB);
  const [localFavs, setLocalFavs] = useState([]);

  const getRecipes = () => {
    favorites.forEach(id => {
      // do-da-little-dance
      getRecipe({ variables: { id } });
    });
  }; */

  return (
    <View style={styles.container}>
      <Text>Your Recipes:</Text>
      <FlatList
        data={data.getRecipesByIds}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <FavoritesCard recipe={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Favorites;
