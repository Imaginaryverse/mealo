import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Welcome {user.name}!</Text>
    </View>
  );
};

export default Home;
