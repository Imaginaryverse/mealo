import React, { useEffect } from 'react';
import DayPlanContainer from './DayPlanContainer';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { sortMealPlanByDay } from '../utils';

const MealPlanList = ({ mealPlan }) => {
  const renderItem = ({ item }) => <DayPlanContainer dayPlan={item} />;

  return (
    <View>
      <FlatList
        data={sortMealPlanByDay(mealPlan)}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
};

export default MealPlanList;
