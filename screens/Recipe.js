import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
  Button,
} from 'react-native';
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
    <ScrollView>
      <View>
        <Image source={{ uri: mainImage }} style={styles.img} />
      </View>
      <Text style={styles.title}>{name}</Text>
      <Pressable
        onPress={() => {
          handleFavoriteClick();
        }}
      >
        <Text>
          {inFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </Pressable>

      {/* <Text>Time: {totalTime}</Text> */}
      {/* <Text>{ingredientsCount} Ingredients</Text> */}
      <Text>
        {ingredientsCount} Ingredients • {totalTime}
      </Text>
      {ingredientLines.map((ingredient, index) => (
        <Text key={index}>• {ingredient}</Text>
      ))}
      <View>
        <Text>Instructions:</Text>
        {instructions.length ? (
          instructions.map(el => <Text>{el}</Text>)
        ) : (
          <>
            <Text>See instructions in link below</Text>
            <Button
              onPress={() => Linking.openURL(source.recipeUrl)}
              title='Open in browser'
            />
          </>
        )}
      </View>
      <View>
        <Text>Nutrients Per Serving:</Text>
        <Text>Protein: {nutrientsPerServing.protein}g</Text>
        <Text>Fiber: {nutrientsPerServing.fiber}g</Text>
        <Text>Fat: {nutrientsPerServing.fat}g</Text>
        <Text>Sugar: {nutrientsPerServing.sugar}g</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
  },
  img: {
    height: Dimensions.get('screen').width - 100,
    width: Dimensions.get('screen').width,
  },
});
export default Recipe;
