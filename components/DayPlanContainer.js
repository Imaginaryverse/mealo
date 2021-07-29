import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { getDayOfWeek } from '../utils';
import MealCard from './MealCard';

const DayPlanContainer = ({ dayPlan, navigation }) => {
  return (
    <View style={styles.dayPlanContainer}>
      <View style={styles.dayInfoContainer}>
        <Text style={styles.dayInfoTitle}>
          Day {dayPlan.day} ({getDayOfWeek(dayPlan.date)})
        </Text>
        <Text style={styles.dayInfoSub}>
          {dayPlan.date.substring(0, 10)} | {Math.floor(dayPlan.calories)} kcal
        </Text>
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
    height: Dimensions.get('window').height - 90,
    width: Dimensions.get('window').width - 5,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
  },
  dayInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dayInfoTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  dayInfoSub: {
    fontWeight: '700',
    color: 'grey',
  },
  mealsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DayPlanContainer;
