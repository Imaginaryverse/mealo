import React from 'react';
import DayPlanContainer from './DayPlanContainer';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MealPlanList = ({ mealPlan }) => {
  const renderItem = ({ item }) => <DayPlanContainer dayPlan={item} />;

  return (
    <View>
      <FlatList data={mealPlan} renderItem={renderItem} />
    </View>
  );
};

export default MealPlanList;
