import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const FavoritesCard = ({ recipe, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Recipe', { recipe: recipe })}
    >
      <View style={styles.mealCard}>
        <Image source={{ uri: recipe.mainImage }} style={styles.img} />
        <View style={styles.mealCardInfo}>
          <Text>{recipe.name}</Text>
          <Text>Time: {recipe.totalTime}</Text>
          <Text>
            Calories per Serving:{' '}
            {Math.floor(recipe.nutrientsPerServing.calories)}
          </Text>
        </View>
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
  img: {
    height: 100,
    width: 100,
  },
});

export default FavoritesCard;
