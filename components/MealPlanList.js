import React from 'react';
import DayPlanContainer from './DayPlanContainer';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

const MealPlanList = ({ mealPlan }) => {
  const renderItem = ({ item }) => <DayPlanContainer dayPlan={item} />;

  return (
    <View>
      <FlatList data={mealPlan} renderItem={renderItem} key={uuid.v4()} />
    </View>
  );
};

export default MealPlanList;
