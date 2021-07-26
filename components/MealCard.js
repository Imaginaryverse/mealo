import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';

const MealCard = ({ meal, navigation }) => {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealCardInfo}>
        <Text>Meal: {meal.meal}</Text>
        <Text>Calories: {Math.floor(meal.calories)}</Text>
        <Text>{meal.recipe.name}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title='Swap'
          onPress={() =>
            navigation.navigate('Swap', {
              recipe: meal.recipe,
              mealId: meal.id,
            })
          }
        />
        <Button
          title='Details'
          onPress={() => navigation.navigate('Recipe', { recipe: meal.recipe })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    width: '100%',
    flexDirection: 'row',

    margin: 5,

    borderColor: 'black',
    borderWidth: 1,
  },
  mealCardInfo: {
    width: '80%',
  },
});

export default MealCard;
