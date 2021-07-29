import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  RECIPE_SWAP_OPTIONS,
  SWAP_MEALPLAN_RECIPE,
} from '../queries/DBqueries';
import { SwapCard } from '../components';
import { UpdateMealPlanState } from '../redux/slices/userSlice';

const Swap = ({ navigation, route }) => {
  const { recipe, mealId } = route.params;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(RECIPE_SWAP_OPTIONS, {
    variables: { recipeId: recipe.id, userId: user.databaseId },
  });
  const [
    confirmSwap,
    { loading: confirmLoading, error: confirmError, data: confirmData },
  ] = useMutation(SWAP_MEALPLAN_RECIPE);
  const [selectedId, setSelectedId] = useState(recipe.id);

  const onPressSelect = id => {
    setSelectedId(id);
  };

  const onConfirm = () => {
    confirmSwap({
      variables: {
        recipeId: selectedId,
        mealId: mealId,
        userId: user.databaseId,
      },
    });
  };

  useEffect(() => {
    if (confirmData && confirmData.swapMealPlanRecipe) {
      dispatch(UpdateMealPlanState(confirmData.swapMealPlanRecipe.mealPlan));
      navigation.navigate('MealPlanner');
    }
  }, [confirmData]);

  if (loading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
        <ActivityIndicator size={80} color='#89b337' />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text
          style={{
            marginTop: 200,
            textAlign: 'center',
          }}
        >
          Oops! Couldn't find any similar recipes
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.headers}>Your Current Meal</Text>
      <SwapCard
        recipe={recipe}
        selectedId={selectedId}
        onPressSelect={onPressSelect}
        isOriginal={true}
      />
      <View>
        <Text style={styles.headers}>Alternative Meals</Text>
        {data.recipeSwapOptions.map((recipe, index) => (
          <SwapCard
            recipe={recipe}
            selectedId={selectedId}
            onPressSelect={onPressSelect}
            isOriginal={false}
            key={index}
          />
        ))}
      </View>

      {confirmLoading ? (
        <View style={styles.smallLoadingContainer}>
          <Text style={{ marginBottom: 10 }}>
            Updating meal plan. Please wait...
          </Text>
          <ActivityIndicator size={40} color='#89b337' />
        </View>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={() => onConfirm()}>
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headers: {
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallLoadingContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1.5,
    backgroundColor: '#FFC757',
    width: 130,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Swap;
