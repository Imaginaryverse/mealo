import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RadioButton = ({ handlePress }) => {
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Icon
          name={
            recipe.id === selectedId
              ? 'ios-radio-button-on'
              : 'ios-radio-button-off'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;
