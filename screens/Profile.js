import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserAge } from '../utils';

const Profile = () => {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Profile;
