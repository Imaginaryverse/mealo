import React, { useState, useEffect } from 'react';
// import { MealPlanList, MealPlanGenerator } from '../components/index';
import MealPlanList from '../components/MealPlanList';
import MealPlanGenerator from '../components/MealPlanGenerator';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button, Pressable, Alert } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { gql, useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_MEALPLAN_FROM_DB, GENERATE_MEAL_PLAN } from '../queries/DBqueries';
import { UpdateMealPlanState } from '../redux/slices/userSlice';

/* const initOptions = {
  addDays: false,
  ignoreLock: true,
  kcalLimit: null,
  maxNumOfServings: null,
  breakfastDistribution: null,
  lunchDistribution: null,
  dinnerDistribution: null,
  snackDistribution: null,
}; */

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
    /* onCompleted: data => {
        console.log('onCompleted', data);
        if(data.getMealPlanFromDb) {
          dispatch(UpdateMealPlan(data.getMealPlanFromDb.mealPlan));
        }
      } */
  });
  const [generateMealPlan, { loading: generateLoading, error: generateError }] =
    useMutation(GENERATE_MEAL_PLAN);
  const [options, setOptions] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleMealPlanClick = async () => {
    console.log('🥦 Generating meal plan...');
    try {
      const res = await generateMealPlan({
        variables: {
          userId,
          addDays: false,
          ignoreLock: true,
          /*  kcalLimit: null,
          breakfastDistribution: 0.3,
          lunchDistribution: 0.3,
          dinnerDistribution: 0.3,
          snackDistribution: 0.1, */
        },
      });

      if (res.data.generateMealPlan.success) {
        console.log('🥦 Meal plan generated...');
        getMealPlanFromDb();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* useEffect(() => {
    if (!mealPlan) {
      console.log('🥦 No meal plan. Fetching from DB...');
      getMealPlanFromDb();
    }
  }, [mealPlan]); */

  useEffect(() => {
    if (data && data.getMealPlanFromDb) {
      console.log(`💰 ${new Date().toLocaleTimeString()}: Cached meal plan...`);
      dispatch(UpdateMealPlanState(data.getMealPlanFromDb.mealPlan));
    }
  }, [data]);

  useEffect(() => {
    if (generateError) {
      console.log('Error on generating', generateError);
    }
  }, [generateError]);

  if (dbLoading) {
    return (
      <View styles={styles.container}>
        <Text>Loading meal plan...</Text>
      </View>
    );
  }

  /* 
      {generateLoading && <Text>Generating meal plan...</Text>}
      {generateError && <Text>Error</Text>}
  */
  const handleFabPress = () =>
    Alert.alert(
      'Generate new meal plan?',
      'Clicking OK will take you to the Mealplan generator.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => setShowGenerator(true) },
      ]
    );
  return (
    <View style={styles.container}>
      {mealPlan && !showGenerator ? (
        <View>
          <FAB
            onPress={() => handleFabPress()}
            icon={<Icon name='arrow-right' size={15} color='white' />}
          />
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
    marginTop: 20,
    marginBottom: 0,
  },
});

export default MealPlanner;
