import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, Text } from 'react-native';

const Profile = () => {
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

  return (
    <View>
      <Text>PROFILE</Text>
    </View>
  );
};

export default Profile;
