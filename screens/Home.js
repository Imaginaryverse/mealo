import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getCurrentDate, getDayOfWeek, capitalizeName } from '../utils';
import { UpdateMealPlanState } from '../redux/slices/userSlice';
import { GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';

const Home = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const favorites = useSelector(state => state.user.favoriteRecipes) || [];
  const mealPlan = useSelector(state => state.mealPlan);
  const [currentDayPlan, setCurrentDayPlan] = useState(null);
  const [getMealPlanFromDb, { loading, error, data }] =
    useLazyQuery(GET_MEALPLAN_FROM_DB);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!mealPlan) {
      getMealPlanFromDb({ variables: { userId: user.databaseId } });
    }
  }, [mealPlan]);

  useEffect(() => {
    if (data && data.getMealPlanFromDb) {
      dispatch(UpdateMealPlanState(data.getMealPlanFromDb.mealPlan));
    }
  }, [data]);

  useEffect(() => {
    if (mealPlan) {
      const currentDate = getCurrentDate('YYMMDD');
      const dp = mealPlan.find(mp => mp.date.substring(0, 10) === currentDate);

      setCurrentDayPlan(dp);
    }
  }, [mealPlan]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Recipe', { recipe: item.recipe })}
    >
      <View style={styles.item}>
        <Text>{capitalizeName(item.meal)}</Text>
        <Text>{item.recipe.name}</Text>
        <View>
          <Image source={{ uri: item.recipe.mainImage }} style={styles.image} />
        </View>
        <View style={styles.tags}>
          <Text style={styles.tag}>
            {item.recipe.ingredientsCount} Ingredients
          </Text>
          <Text style={styles.tag}>{item.recipe.totalTime}</Text>
        </View>
        <View style={styles.nutrientContainer}>
          <View style={styles.nutrientColumn}>
            <Text>
              Calories: {Math.floor(item.recipe.nutrientsPerServing.calories)}{' '}
              kcal
            </Text>
            <Text>
              Sugar: {Math.floor(item.recipe.nutrientsPerServing.sugar)}g
            </Text>
            <Text>
              Fiber: {Math.floor(item.recipe.nutrientsPerServing.fiber)}g
            </Text>
          </View>
          <View style={styles.nutrientColumn}>
            <Text>
              Protein: {Math.floor(item.recipe.nutrientsPerServing.protein)}g
            </Text>
            <Text>
              Carbs: {Math.floor(item.recipe.nutrientsPerServing.carbs)}g
            </Text>
            <Text>Fat: {Math.floor(item.recipe.nutrientsPerServing.fat)}g</Text>
          </View>
        </View>
        {favorites.includes(item.recipe.id) && <Text>FAVORITE</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && !mealPlan) {
    return (
      <View style={styles.container}>
        <View style={styles.homeContent}>
          <Text style={styles.h1}>Welcome {capitalizeName(user.name)}!</Text>
          <Text>You don't have a meal plan. Generate one!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentDayPlan && (
        <View style={styles.homeContent}>
          <Text style={styles.h1}>Welcome {capitalizeName(user.name)}!</Text>
          <Text style={styles.h2}>{getDayOfWeek()}'s meal plan:</Text>

          <View style={styles.carouselContainer}>
            <Carousel
              layout={'default'}
              data={currentDayPlan.meals}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={320}
              renderItem={renderItem}
              onSnapToItem={index => setActiveIndex(index)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 440,
    padding: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  h1: {
    fontSize: 22,
  },
  h2: {
    fontSize: 18,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: 'linen',
  },
  nutrientContainer: {
    flexDirection: 'row',
  },
  nutrientColumn: {
    flexDirection: 'column',
    marginRight: 5,
    /* justifyContent: 'center',
    alignItems: 'center', */
  },
});

export default Home;
