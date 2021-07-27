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
          <Text>
            {Math.floor(recipe.nutrientsPerServing.calories)} kcal •{' '}
            {recipe.totalTime}
          </Text>
          {/* <Text>
            Calories per Serving:{' '}
            {Math.floor(recipe.nutrientsPerServing.calories)}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flex: 1,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 180,
  },
  mealCardInfo: {
    width: '80%',
  },
  img: {
    height: 180,
    width: 180,
  },
});

export default FavoritesCard;
