import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FAB = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
      <Icon name='ios-restaurant-outline' size={30} color='#01a699' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'blue',
  },
});
export default FAB;
