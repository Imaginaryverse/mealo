import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { GET_RECIPE_FROM_DB } from '../queries/DBqueries';

const Favorites = ({ navigation }) => {
  const favorites = useSelector(state => state.user.favoriteRecipes);
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
      <Text>{favorites}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Favorites;
