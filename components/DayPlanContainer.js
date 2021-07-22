import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DayPlanContainer = ({ dayPlan }) => {
  const renderItem = ({ item }) => (
    <View>
      <Text>Meal: {item.meal}</Text>
      <Text>Calories: {Math.floor(item.calories)}</Text>
      <Text>{item.recipe.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Day: {dayPlan.day}</Text>
      <Text>Calories: {Math.floor(dayPlan.calories)}</Text>
      <View style={styles.dayPlanContainer}>
        <FlatList data={dayPlan.meals} renderItem={renderItem} />
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
