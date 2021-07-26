import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLazyQuery } from '@apollo/client';

const SwapCard = ({ recipe, onPressSelect, selectedId, isOriginal }) => {
  return (
    <TouchableOpacity>
      <View style={styles.mealCard}>
        <View style={styles.mealCardInfo}>
          <Text>{recipe.name}</Text>
          <Text>Time: {recipe.totalTime}</Text>
          <Text>
            Calories per Serving:{' '}
            {Math.floor(recipe.nutrientsPerServing.calories)}
          </Text>
        </View>
        {!isOriginal && (
          <View>
            {recipe.id === selectedId ? (
              <Text>👍</Text>
            ) : (
              <Button title='Select' onPress={() => onPressSelect(recipe.id)} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    width: '90%',
    flexDirection: 'row',

    margin: 5,

    borderColor: 'black',
    borderWidth: 1,
  },
  mealCardInfo: {
    width: '80%',
  },
});

export default SwapCard;
