import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import RadioButton from './RadioButton';
import { useLazyQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

const SwapCard = ({ recipe, onPressSelect, selectedId, isOriginal }) => {
  const [showMore, setShowMore] = useState(false);

  /*
   const toggleShowMore = () => {
    if (showMore) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
    setShowMore(!ShowMore);
  };
   */

  return (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      style={styles.touchable}
      style={styles.mealCard}
    >
      <View style={styles.topContainer}>
        <Image source={{ uri: recipe.mainImage }} style={styles.image} />
        <View style={styles.topInfo}>
          <Text style={styles.mealTag}>
            {recipe.mealTags.length ? recipe.mealTags[0] : 'Food'}
          </Text>
          <Text style={styles.mealName}>{recipe.name}</Text>
          <Text style={styles.mealTags}>
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
          <View style={{ paddingTop: 10, paddingBottom: 25 }}>
            <Text style={styles.mealTags}>
              {recipe.ingredientsCount} Ingredients
            </Text>
            {recipe.ingredientLines.map((ingredient, index) => (
              <Text style={styles.ingredientText} key={index}>
                • {ingredient}
              </Text>
            ))}
          </View>
        )}
      </View>
      <Icon
        name={showMore ? 'ios-chevron-up' : 'ios-chevron-down'}
        size={25}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    padding: 8,
    width: Dimensions.get('screen').width - 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    shadowColor: '#bbb',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 1,
    width: '100%',

    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },
  topInfo: {
    width: 180,
    marginLeft: 8,
    //flex: 1,
    justifyContent: 'flex-start',
  },
  mealTag: {
    color: 'grey',
    fontWeight: 'bold',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '700',
    //fontFamily: 'Inter_600SemiBold',
  },
  mealTags: {
    color: 'grey',
  },
  ingredientText: {
    //fontFamily: 'Roboto_400Regular',
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraDetails: {
    width: '98%',
  },
  chevron: {
    position: 'absolute',
    bottom: 0,
  },
});

export default SwapCard;
