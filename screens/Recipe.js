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
import Icon from 'react-native-vector-icons/Ionicons';
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
      <Image source={{ uri: mainImage }} style={styles.img} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <Pressable
          onPress={() => {
            handleFavoriteClick();
          }}
        >
          {inFavorites ? (
            <View style={styles.fav}>
              <Icon name='ios-heart' color='red' size={25} />
            </View>
          ) : (
            <View style={styles.fav}>
              <Icon name='ios-heart-outline' color='red' size={25} />
            </View>
          )}
        </Pressable>
      </View>
      <View style={styles.detailContainer}>
        <Text>
          {ingredientsCount} Ingredients • {numberOfServings} Servings
        </Text>
        {ingredientLines.map((ingredient, index) => (
          <Text key={index}>• {ingredient}</Text>
        ))}
      </View>

      <View style={styles.detailContainer}>
        <Text>{totalTime}</Text>
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
      <View style={styles.detailContainer}>
        <Text>Nutrients Per Serving</Text>
        <Text>Protein: {nutrientsPerServing.protein}g</Text>
        <Text>Fiber: {nutrientsPerServing.fiber}g</Text>
        <Text>Fat: {nutrientsPerServing.fat}g</Text>
        <Text>Sugar: {nutrientsPerServing.sugar}g</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginRight: 8,
  },
  img: {
    height: Dimensions.get('screen').width - 100,
    width: Dimensions.get('screen').width,
  },
  fav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
});
export default Recipe;
