import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import {
  ADD_RECIPE_TO_FAVORITES,
  REMOVE_RECIPE_FROM_FAVORITES,
} from '../queries/DBqueries';
import { UpdateUserFavoritesState } from '../redux/slices/userSlice';

const Recipe = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const favorites = user.favoriteRecipes || [];
  const { recipe } = route.params;
  const {
    id,
    name,
    courses,
    cuisines,
    mealTags,
    instructions,
    totalTime,
    ingredientsCount,
    ingredientLines,
    numberOfServings,
    mainImage,
    source,
    nutrientsPerServing,
    caloriesPerServing,
  } = recipe;
  const [inFavorites, setInFavorites] = useState(favorites.includes(id));

  const [addToFavorites, { loading, error, data }] = useMutation(
    ADD_RECIPE_TO_FAVORITES
  );
  const [removeFromFavorites, { data: removeData }] = useMutation(
    REMOVE_RECIPE_FROM_FAVORITES
  );

  const handleFavoriteClick = () => {
    if (!inFavorites) {
      dispatch(UpdateUserFavoritesState([...favorites, id]));
      addToFavorites({ variables: { recipeId: id, userId: user.databaseId } });
    } else {
      dispatch(UpdateUserFavoritesState(favorites.filter(el => el !== id)));
      removeFromFavorites({
        variables: { recipeId: id, userId: user.databaseId },
      });
    }
  };

  useEffect(() => {
    setInFavorites(favorites.includes(id));
  }, [favorites]);

  return (
    <View>
      <Text>
        {name} ({totalTime})
      </Text>
      <View>
        <Image source={{ uri: mainImage }} style={styles.img} />
      </View>

      {/* <Text>Time: {totalTime}</Text> */}
      {/* <Text>{ingredientsCount} Ingredients</Text> */}
      <Text>Ingredients ({ingredientsCount}):</Text>
      {ingredientLines.map((ingredient, index) => (
        <Text key={index}>• {ingredient}</Text>
      ))}
      <Text>
        {instructions.length
          ? `Instructions: ${instructions}`
          : `Instructions for the recipe can be found at: ${source.recipeUrl} `}
      </Text>
      <Pressable
        onPress={() => {
          handleFavoriteClick();
        }}
      >
        <Text>
          {inFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 150,
    width: 150,
  },
});
export default Recipe;
