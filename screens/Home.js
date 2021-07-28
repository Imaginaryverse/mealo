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
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCurrentDate, getDayOfWeek, capitalizeName } from '../utils';
import { UpdateMealPlanState } from '../redux/slices/userSlice';
import { GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';
/* import placeholderImage from '../assets/ph.jpg';
const placeholderUri = Image.resolveAssetSource(placeholderImage).uri; */

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
      style={styles.itemContainer}
    >
      <View style={styles.item}>
        <Text style={styles.mealTag}>{capitalizeName(item.meal)}</Text>
        <View style={styles.titleContainer}>
          <View style={styles.recipeNameContainer}>
            <Text style={styles.recipeName}>{item.recipe.name}</Text>
          </View>

          {favorites.includes(item.recipe.id) ? (
            <View style={styles.fav}>
              <Icon name='ios-heart' color='red' size={20} />
            </View>
          ) : (
            <View style={styles.fav}>
              <Icon name='ios-heart-outline' color='red' size={20} />
            </View>
          )}
        </View>
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
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Calories</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.calories)} kcal
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Protein</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.protein)}g
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Fiber</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.fiber)}g
              </Text>
            </View>
          </View>
          <View style={styles.nutrientColumn}>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Carbs</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.carbs)}g
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Fat</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.fat)}g
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Sugar</Text>
              <Text style={styles.detailValue}>
                {Math.floor(item.recipe.nutrientsPerServing.sugar)}g
              </Text>
            </View>
          </View>
        </View>
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

          <Image
            style={styles.ctaImage}
            source={{
              uri: 'https://image.flaticon.com/icons/png/512/776/776452.png',
            }}
          />
          <Text style={styles.noPlanText}>
            Seems like you don't have a meal plan.
          </Text>
          <Text style={styles.noPlanText}>
            Click the button below to start generating!
          </Text>

          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate('Meal Plan')}
          >
            <Text style={styles.ctaText}>GENERATE MEAL PLAN</Text>
          </TouchableOpacity>
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
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  ctaBtn: {
    height: 60,
    width: 280,
    padding: 20,

    marginTop: 40,
    marginBottom: 40,

    borderColor: '#bbb',
    borderWidth: 1.6,
    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 22,
  },
  noPlanText: {
    fontSize: 18,
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white',

    borderColor: '#bbb',
    borderWidth: 1.6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  item: {
    height: 440,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  recipeNameContainer: {
    width: 200,
  },
  recipeName: {
    fontSize: 18,
  },
  ctaImage: {
    height: 220,
    width: 220,
    marginTop: 60,
    marginBottom: 40,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1.2,
    marginBottom: 15,
  },
  h1: {
    fontSize: 26,
  },
  h2: {
    fontSize: 18,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTag: {
    color: 'grey',
  },
  tag: {
    color: 'grey',
    backgroundColor: 'linen',
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientColumn: {
    flexDirection: 'column',
    marginRight: 5,
    /* justifyContent: 'center',
    alignItems: 'center', */
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

export default Home;
