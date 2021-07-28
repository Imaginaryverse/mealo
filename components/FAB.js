import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FAB = ({ handlePress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={handlePress}>
      <Icon name='ios-newspaper-outline' size={25} color='black' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    height: 35,
    width: 35,
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
});
export default FAB;
