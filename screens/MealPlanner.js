import React, { useState, useEffect } from 'react';
import { MealPlanList, MealPlanGenerator } from '../components/index';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { gql, useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_MEALPLAN_FROM_DB, GENERATE_MEAL_PLAN } from '../queries/DBqueries';
import { UpdateMealPlan } from '../redux/slices/userSlice';

const initOptions = {
  addDays: false,
  ignoreLock: true,
  kcalLimit: null,
  maxNumOfServings: null,
  breakfastDistribution: null,
  lunchDistribution: null,
  dinnerDistribution: null,
  snackDistribution: null,
};

const MealPlanner = () => {
  const userId = useSelector(state => state.user.databaseId);
  const mealPlan = useSelector(state => state.mealPlan);
  const dispatch = useDispatch();
  const [
    getMealPlanFromDb,
    { loading: dbLoading, error: dbError, data, refetch },
  ] = useLazyQuery(GET_MEALPLAN_FROM_DB, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
    /* onCompleted: data => {
        console.log('onCompleted', data);
        if(data.getMealPlanFromDb) {
          dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
        }
      } */
  });
  const [generateMealPlan, { loading: generateLoading, error: generateError }] =
    useMutation(GENERATE_MEAL_PLAN);
  const [options, setOptions] = useState(initOptions);

  const handleMealPlanClick = async () => {
    console.log('generating...');
    try {
      const res = await generateMealPlan({
        variables: {
          userId,
          addDays: false,
          ignoreLock: true,
          kcalLimit: null,
          breakfastDistribution: 0.3,
          lunchDistribution: 0.3,
          dinnerDistribution: 0.3,
          snackDistribution: 0.1,
        },
      });
      if (res.data.generateMealPlan.success) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!mealPlan) {
      console.log('No meal plan. Fetching from DB...');
      getMealPlanFromDb();
    }
  }, [mealPlan]);

  useEffect(() => {
    if (data && data.getMealPlanFromDb) {
      console.log(`💰 ${new Date().toLocaleTimeString()}: Cached meal plan...`);
      dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text>MEAL PLANNER</Text>
      {mealPlan ? (
        <MealPlanList mealPlan={mealPlan} />
      ) : dbLoading ? (
        <Text>Loading meal plan...</Text>
      ) : (
        <MealPlanGenerator handleMealPlanClick={handleMealPlanClick} />
      )}
      {generateLoading && <Text>Generating meal plan...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MealPlanner;
