import React, { useState, useEffect } from 'react';
import { MealPlan, MealPlanGenerator } from '../components/index';
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
        const result = getMealPlanFromDb({ variables: { userId } });
        console.log('result from getting db', result);

        // console.log('dbMealPlan', dbMealPlan);
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
    if (data) {
      console.log('Got MealPlan bro?');
      dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text>MEAL PLANNER</Text>
      {mealPlan ? (
        <MealPlan mealPlan={mealPlan} />
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
