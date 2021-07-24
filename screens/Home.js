import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { getCurrentDate } from '../utils';
import { UpdateMealPlanState } from '../redux/slices/userSlice';
import { GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';

const Home = () => {
  const user = useSelector(state => state.user);
  const mealPlan = useSelector(state => state.mealPlan);
  const [currentDayPlan, setCurrentDayPlan] = useState(null);
  const [getMealPlanFromDb, { loading, error, data }] =
    useLazyQuery(GET_MEALPLAN_FROM_DB);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mealPlan) {
      getMealPlanFromDb({ variables: { userId: user.databaseId } });
    }
  }, [mealPlan]);

  useEffect(() => {
    if (data && data.getMealPlanFromDb) {
      dispatch(UpdateMealPlanState(data.getMealPlanFromDb.mealPlan));
    }
  }, [data]);

  useEffect(() => {
    const currentDate = getCurrentDate();
    const dp = mealPlan.find(mp => mp.date.substring(0, 10) === currentDate);

    setCurrentDayPlan(dp);
  }, [mealPlan]);

  return (
    <View style={styles.container}>
      <Text>Welcome {user.name}!</Text>
      {currentDayPlan ? (
        <View>
          <Text>This is your meal plan for today...</Text>
          {currentDayPlan && (
            <View>
              <Text>{currentDayPlan.date}</Text>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text>No meal plan, try generating one first</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Home;
