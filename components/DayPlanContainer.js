import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const DayPlanContainer = ({dayPlan}) => {
  // const mealPlan = useSelector(state => state.mealPlan);

  console.log(dayPlan);

  return (
    <View style={styles.container}>
      <Text>This is your dayplan!</Text>
      <Text>{dayPlan.day}</Text>
      <View style={styles.dayPlanContainer}>
        {dayPlan.meals.map((meal, i) => (
          <View key={i}>
            <Text>Meal: {meal.meal}</Text>
            <Text>Calories: {Math.floor(meal.calories)}</Text>
            <Text></Text>Recipe: {meal.recipe.name}</Text>
            {/* <Text>{mp.recipe.name}</Text> */}
            {/* <Text>Meal: {mp.meal}</Text> */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  dayPlanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DayPlanContainer;
