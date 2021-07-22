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
  const [getMealPlanFromDb, { data }] = useLazyQuery(GET_MEALPLAN_FROM_DB);
  const [generateMealPlan, { mutationData }] = useMutation(GENERATE_MEAL_PLAN);
  const userId = useSelector(state => state.user.databaseId);
  const [options, setOptions] = useState(initOptions);
  const mealPlan = useSelector(state => state.mealPlan);
  const dispatch = useDispatch();

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
        getMealPlanFromDb({ variables: { userId } });
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!mealPlan) {
      getMealPlanFromDb({ variables: { userId } });
    }
  }, []);

  useEffect(() => {
    console.log(mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    /* if (data !== undefined && data.getMealPlanFromDb !== null) {
      console.log('Updating mealplan...');
      dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
    } */

    // console.log(data);

    if (data.getMealPlanFromDb.mealPlan) {
      console.log('Updating mealplan...');
      dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
    }
  }, [data.getMealPlanFromDb.mealPlan]);

  return (
    <View style={styles.container}>
      <Text>MEAL PLANNER</Text>
      {mealPlan ? (
        <MealPlanList mealPlan={mealPlan} />
      ) : (
        <MealPlanGenerator handleMealPlanClick={handleMealPlanClick} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MealPlanner;
