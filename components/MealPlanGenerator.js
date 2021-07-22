import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MealPlanGenerator = ({ handleMealPlanClick }) => {
  return (
    <View style={styles.container}>
      <Text>MEAL PLANNER</Text>
      <Pressable onPress={() => handleMealPlanClick()}>
        <Text>Click to generate your Mealplan</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MealPlanGenerator;
