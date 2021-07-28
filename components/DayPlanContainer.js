import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { getDayOfWeek } from '../utils';
import MealCard from './MealCard';

const DayPlanContainer = ({ dayPlan, navigation }) => {
  /*  const renderItem = ({ item }) => (
    <MealCard meal={item} navigation={navigation} />
  ); */

  {
    /* <View>
      <Text>Meal: {item.meal}</Text>
      <Text>Calories: {Math.floor(item.calories)}</Text>
      <Text>{item.recipe.name}</Text>
    </View> */
  }
  return (
    <View style={styles.dayPlanContainer}>
      <View style={styles.dayInfoContainer}>
        <Text>
          Day {dayPlan.day} ({getDayOfWeek(dayPlan.date)})
        </Text>
        <Text>Date: {dayPlan.date.substring(0, 10)}</Text>
        <Text>{Math.floor(dayPlan.calories)} kcal Calories</Text>
      </View>
      <View style={styles.mealsContainer}>
        <FlatList
          data={dayPlan.meals}
          renderItem={({ item }) => (
            <MealCard meal={item} navigation={navigation} />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPlanContainer: {
    // height: Dimensions.get('screen').height - 60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'olive',
  },
  dayInfoContainer: {
    backgroundColor: 'tomato',
  },
  mealsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DayPlanContainer;
