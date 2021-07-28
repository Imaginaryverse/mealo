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
  TouchableOpacity,
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
          <View style={styles.fav}>
            <Icon
              name={inFavorites ? 'ios-heart' : 'ios-heart-outline'}
              color='red'
              size={25}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.tags}>
          {ingredientsCount} Ingredients • {numberOfServings} Servings
        </Text>
        {ingredientLines.map((ingredient, index) => (
          <Text key={index}>• {ingredient}</Text>
        ))}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.tags}>{totalTime}</Text>
        {instructions.length ? (
          instructions.map(el => <Text>{el}</Text>)
        ) : (
          <>
            <Text style={{ alignSelf: 'center' }}>
              See instructions in link below
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => Linking.openURL(source.recipeUrl)}
            >
              <Text>Open in browser</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.tags}>Nutrients Per Serving</Text>

        <View style={styles.columnsContainer}>
          <View style={styles.detailColumn}>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Calories</Text>
              <Text style={styles.detailValue}>
                {Math.floor(nutrientsPerServing.calories)} kcal
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Protein</Text>
              <Text style={styles.detailValue}>
                {nutrientsPerServing.protein}g
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Carbs</Text>
              <Text style={styles.detailValue}>
                {nutrientsPerServing.carbs}g
              </Text>
            </View>
          </View>

          <View style={styles.detailColumn}>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Fat</Text>
              <Text style={styles.detailValue}>{nutrientsPerServing.fat}g</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Fiber</Text>
              <Text style={styles.detailValue}>
                {nutrientsPerServing.fiber}g
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Sugar</Text>
              <Text style={styles.detailValue}>
                {nutrientsPerServing.sugar}g
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    width: '85%',
    fontSize: 24,
    textAlign: 'center',
    marginRight: 5,
  },
  img: {
    height: Dimensions.get('screen').width - 100,
    width: Dimensions.get('screen').width,
  },
  fav: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 13,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    shadowColor: '#bbb',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
    backgroundColor: 'white',
  },
  columnsContainer: {
    paddingRight: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /* nutrientsContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    shadowColor: '#bbb',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
    backgroundColor: 'white',
  }, */
  btn: {
    width: 150,
    marginTop: 5,
    padding: 5,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'gray',
    backgroundColor: '#FFC757',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  tags: {
    color: 'grey',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
  },
  detailName: {
    fontWeight: 'bold',
    color: 'grey',
    marginRight: 5,
  },
});
export default Recipe;
