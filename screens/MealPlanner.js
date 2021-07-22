import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';

const MealPlanner = () => {
  const { loading, error, data } = useQuery(GET_MEALPLAN_FROM_DB);
  const 
  if (loading) {
    console.log('loading...');
    return <Text style={styles.container}>loading</Text>;
  } else if (error) {
    console.log('error...');
    console.log(error);
    return <Text style={styles.container}>Error</Text>;
  }

  if (data) {
    console.log('got something...');
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Text>MEAL PLANNER</Text>
      <Pressable onPress={() => {}}>
        <Text>Click</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default MealPlanner;
