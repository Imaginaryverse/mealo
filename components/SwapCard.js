import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

const SwapCard = ({ recipe, onPressSelect, selectedId, isOriginal }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      style={styles.touchable}
    >
      <View style={styles.mealCard}>
        <View style={styles.mealCardInfo}>
          <Text>{recipe.name}</Text>
          <Text>Time: {recipe.totalTime}</Text>
          <Text>
            Calories per Serving:{' '}
            {Math.floor(recipe.nutrientsPerServing.calories)}
          </Text>
          {showMore && (
            <View>
              <Text>{recipe.ingredientsCount}</Text>
            </View>
          )}
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
      <Icon name={showMore ? 'ios-chevron-up' : 'ios-chevron-down'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderColor: 'black',
    borderWidth: 1,
  },
  mealCard: {
    width: '90%',
    flexDirection: 'row',
    margin: 5,
  },
  mealCardInfo: {
    width: '80%',
    // flexDirection: 'row',
  },
});

export default SwapCard;
