import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { gql, useQuery } from '@apollo/client';

console.log(`${new Date().toLocaleString()}: Saved...`);

const GETALLUSERS = gql`
  query {
    getAllDbUsers {
      user {
        id
        name
        password
      }
    }
  }
`;

/* const test = async () => {
  console.log('testing...');
  const wtf = await fetch(
    'https://limitless-badlands-33344.herokuapp.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{getAllDbUsers {
        name
    }}`,
      }),
    }
  );

  console.log(wtf);
}; */

const test = async () => {
  console.log('testing...');
  await fetch('http://icanhazdadjoke.com').then(res => console.log(res));
};

test();

const MealPlanner = () => {
  const { loading, error, data } = useQuery(GETALLUSERS);
  if (loading) {
    return <Text style={styles.container}>loading</Text>;
  } else if (error) {
    console.log(error);
    return <Text style={styles.container}>Error</Text>;
  }

  if (data) {
    console.log(data);
  }

  /* useEffect(() => {
    test();
  }, []); */

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
