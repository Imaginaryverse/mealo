import React, { useState, useEffect } from 'react';
import MealPlanList from '../components/MealPlanList';
import MealPlanGenerator from '../components/MealPlanGenerator';
import { FAB } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { gql, useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_MEALPLAN_FROM_DB, GENERATE_MEAL_PLAN } from '../queries/DBqueries';
import { UpdateMealPlanState } from '../redux/slices/userSlice';

const MealPlanner = ({ navigation }) => {
  const userId = useSelector(state => state.user.databaseId);
  const mealPlan = useSelector(state => state.mealPlan);
  const dispatch = useDispatch();
  const [
    getMealPlanFromDb,
    { loading: dbLoading, error: dbError, data, refetch },
  ] = useLazyQuery(GET_MEALPLAN_FROM_DB, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });
  const [generateMealPlan, { loading: generateLoading, error: generateError }] =
    useMutation(GENERATE_MEAL_PLAN);
  const [options, setOptions] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleMealPlanClick = async () => {
    setShowGenerator(false);
    try {
      const res = await generateMealPlan({
        variables: {
          userId,
          addDays: false,
          ignoreLock: true,
        },
      });

      if (res.data.generateMealPlan.success) {
        getMealPlanFromDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data && data.getMealPlanFromDb) {
      dispatch(UpdateMealPlanState(data.getMealPlanFromDb.mealPlan));
      setShowGenerator(false);
    }
  }, [data]);

  const handleFabPress = () =>
    Alert.alert(
      'WARNING!',
      'Clicking OK will reset your meal plan and take you to the Mealplan generator!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => setShowGenerator(true) },
      ]
    );

  if (generateLoading || dbLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
        <ActivityIndicator size={60} color='#89b337' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {mealPlan && !showGenerator ? (
        <View>
          <FAB handlePress={handleFabPress} />
          <MealPlanList mealPlan={mealPlan} navigation={navigation} />
        </View>
      ) : (
        <MealPlanGenerator handleMealPlanClick={handleMealPlanClick} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,

    marginBottom: 0,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loadingContainer: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealPlanner;
