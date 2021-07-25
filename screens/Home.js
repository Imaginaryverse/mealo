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
import { getCurrentDate, getDayOfWeek } from '../utils';
import { UpdateMealPlanState } from '../redux/slices/userSlice';
import { GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';
import { DayPlanContainer } from '../components';

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
    if (mealPlan) {
      const currentDate = getCurrentDate('YYMMDD');
      const dp = mealPlan.find(mp => mp.date.substring(0, 10) === currentDate);

      setCurrentDayPlan(dp);
    }
  }, [mealPlan]);

  /* useEffect(() => {
    if (currentDayPlan) {
      console.log(currentDayPlan);
    }
  }, [currentDayPlan]); */

  return (
    <View style={styles.container}>
      <Text>Welcome {user.name}!</Text>
      {currentDayPlan ? (
        <View>
          <Text>This is your meal plan for today:</Text>
          {currentDayPlan && (
            <View>
              <Text>
                Day {currentDayPlan.day} ({getDayOfWeek()}), {getCurrentDate()}
              </Text>
            </View>
          )}
          {/* {currentDayPlan && <DayPlanContainer dayPlan={currentDayPlan} />} */}
        </View>
      ) : (
        <View>
          <Text>
            Once you have generated a meal plan you'll see today's meals here
          </Text>
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
