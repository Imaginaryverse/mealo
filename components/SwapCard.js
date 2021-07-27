import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RadioButton from './RadioButton';
import { useLazyQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

const SwapCard = ({ recipe, onPressSelect, selectedId, isOriginal }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      style={styles.touchable}
      style={styles.mealCard}
    >
      <View style={styles.topContainer}>
        <Image source={{ uri: recipe.mainImage }} style={styles.image} />
        <View style={styles.topInfo}>
          <Text>{recipe.mealTags[0]}</Text>
          <Text>{recipe.name}</Text>
          <Text>
            {Math.floor(recipe.nutrientsPerServing.calories)} kcal •{' '}
            {recipe.totalTime}
          </Text>
        </View>
        {!isOriginal && (
          <View style={styles.selectContainer}>
            <TouchableOpacity onPress={() => onPressSelect(recipe.id)}>
              <Icon
                size={24}
                name={
                  recipe.id === selectedId
                    ? 'ios-radio-button-on'
                    : 'ios-radio-button-off'
                }
              />
            </TouchableOpacity>
            <Text>Select</Text>
          </View>
        )}
      </View>
      <View style={styles.extraDetails}>
        {showMore && (
          <View>
            <Text>Time: {recipe.totalTime}</Text>
            <Text>
              Calories per Serving:{' '}
              {Math.floor(recipe.nutrientsPerServing.calories)}
            </Text>
            <Text>Ingredients: {recipe.ingredientsCount}</Text>
            {recipe.ingredientLines.map((ingredient, index) => (
              <Text key={index}>• {ingredient}</Text>
            ))}
          </View>
        )}
      </View>
      <Icon name={showMore ? 'ios-chevron-up' : 'ios-chevron-down'} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    width: Dimensions.get('screen').width - 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  topContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'yellow',
  },
  image: {
    width: 100,
    height: 100,
  },
  topInfo: {
    width: 180,
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraDetails: {
    width: '80%',
    // flexDirection: 'row',
  },
});

export default SwapCard;
