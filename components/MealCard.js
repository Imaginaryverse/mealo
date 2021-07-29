import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { capitalizeName } from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const MealCard = ({ meal, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Recipe', { recipe: meal.recipe })}
      style={styles.mealCard}
    >
      <Image source={{ uri: meal.recipe.mainImage }} style={styles.image} />
      <View style={styles.rightContainer}>
        <View style={styles.mealCardInfo}>
          <Text>{capitalizeName(meal.meal)}</Text>
          <Text style={styles.mealName}>{meal.recipe.name}</Text>
          <Text style={styles.mealTags}>
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
            <Icon name='ios-swap-horizontal' size={25} color='#ffad0a' />
            <Text style={styles.iconText}>Swap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 20,
    height: 128,
    padding: 8,
    marginBottom: 10,
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
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  mealCardInfo: {
    paddingTop: 6,
    height: 110,
    width: '90%',
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  mealName: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '700',
  },
  mealTags: {
    color: 'grey',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  iconText: {
    fontSize: 10,
  },
});

export default MealCard;
