import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserAge } from '../utils';

const Profile = () => {
  const user = useSelector(state => state.user);
  /* const { loading, error, data } = useQuery(GET_USER_FROM_DB);
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
  } */

  useEffect(() => {
    if (user) {
      console.log('🦧', user);
    }
  }, [user]);

  return (
    <View>
      <Text>PROFILE</Text>
      <Text>Name: {user.name}</Text>
      <Text>Age: {getUserAge(user.profile.birthdate)}</Text>
      <Text>Sex: {user.profile.biologicalSex}</Text>
      <Text>Birthdate: {user.profile.birthdate.substring(0, 10)}</Text>
      <Text>Height: {user.profile.height} cm</Text>
      <Text>Weight: {user.profile.startingWeight} kg</Text>
    </View>
  );
};

export default Profile;
