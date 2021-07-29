import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LogoutUser } from '../redux/slices/userSlice';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(LogoutUser());
  };

  return (
    <View>
      <Text>SETTINGS</Text>
      <TouchableOpacity style={styles.signOut} onPress={() => handleSignOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signOut: {
    fontSize: 15,
  },
});

export default Settings;
