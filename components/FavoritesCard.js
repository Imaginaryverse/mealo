import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const FavoritesCard = ({ recipe, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Recipe', { recipe: recipe })}
      style={styles.mealCard}
    >
      <Image source={{ uri: recipe.mainImage }} style={styles.img} />
      <View style={styles.mealCardInfo}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.tags}>
          {Math.floor(recipe.nutrientsPerServing.calories)} kcal •{' '}
          {recipe.totalTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 182,
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

    alignContent: 'center',

    elevation: 2,
    backgroundColor: 'white',
  },
  mealCardInfo: {
    flexGrow: 1,
    width: 180,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 8,
  },
  img: {
    height: 180,
    width: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recipeName: {
    fontWeight: '700',
    textAlign: 'center',
  },
  tags: {
    color: 'grey',
    fontSize: 13,
  },
});

export default FavoritesCard;
