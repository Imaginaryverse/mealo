import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { capitalizeName } from '../utils';
import { useLazyQuery } from '@apollo/client';

const MealCard = ({ meal, navigation }) => {
  return (
    <View style={styles.mealCard}>
      <Image source={{ uri: meal.recipe.mainImage }} style={styles.image} />
      <View style={styles.rightContainer}>
        <View style={styles.mealCardInfo}>
          <Text>{capitalizeName(meal.meal)}</Text>
          <Text>{meal.recipe.name}</Text>
          <Text>
            {meal.recipe.ingredientsCount} ingredients • {meal.recipe.totalTime}
          </Text>
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
            onPress={() =>
              navigation.navigate('Recipe', { recipe: meal.recipe })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 15,

    marginBottom: 5,

    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  /* rightContainer: {
    flexDirection: 'row',
  }, */
  mealCardInfo: {
    width: '80%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MealCard;
