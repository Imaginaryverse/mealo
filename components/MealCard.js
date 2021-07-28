import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { capitalizeName } from '../utils';
import { useLazyQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

const MealCard = ({ meal, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Recipe', { recipe: meal.recipe })}
      style={styles.mealCard}
    >
      {/* <View style={styles.mealCard}> */}
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Swap', {
                recipe: meal.recipe,
                mealId: meal.id,
              })
            }
          >
            <Icon name='ios-swap-horizontal' size={25} />
            <Text style={styles.iconText}>Swap</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 20,
    /*     height: 128, */
    padding: 8,
    marginBottom: 13,
    borderColor: 'black',
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
  image: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },
  rightContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 8,
    // backgroundColor: 'red',
  },
  mealCardInfo: {
    flex: 1,
    // height: '100',
    width: '80%',
    marginBottom: 8,
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconText: {
    fontSize: 10,
  },
});

export default MealCard;
