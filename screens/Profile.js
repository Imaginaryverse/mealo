import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getUserAge } from '../utils';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/slices/userSlice';
import { UPDATE_USER_PROFILE } from '../queries/DBqueries';

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(LogoutUser());
  };

  return (
    <View style={styles.container}>
      <Text>PROFILE</Text>
      <Text>Name: {user.name}</Text>
      <Text>Age: {getUserAge(user.profile.birthdate)}</Text>
      <Text>Sex: {user.profile.biologicalSex}</Text>
      <Text>Birthdate: {user.profile.birthdate.substring(0, 10)}</Text>
      <Text>Height: {user.profile.height} cm</Text>
      <Text>Weight: {user.profile.startingWeight} kg</Text>
      <Button
        title='Edit Profile'
        onPress={() => navigation.navigate('EditProfile')}
      />
      <Button title='Log Out' onPress={() => handleSignOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Profile;
