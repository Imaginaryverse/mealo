import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Restriction = ({
  restriction,
  selectedRestrictions,
  setSelectedRestrictions,
}) => {
  const initialStatus = selectedRestrictions
    ? selectedRestrictions.includes(restriction.id)
    : false;
  const [checked, setChecked] = useState(initialStatus);

  const handlePress = () => {
    const newStatus = !checked;
    setChecked(newStatus);

    if (newStatus) {
      setSelectedRestrictions([...selectedRestrictions, restriction.id]);
    } else {
      const newRestrictions = selectedRestrictions.filter(
        el => el !== restriction.id
      );
      setSelectedRestrictions(newRestrictions);
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={
          checked
            ? { ...styles.restrictionContainer, backgroundColor: 'chocolate' }
            : styles.restrictionContainer
        }
      >
        <Text style={styles.restrictionText}>{restriction.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  restrictionText: {
    fontSize: 14,
  },
  restrictionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    elevation: 3,
    backgroundColor: '#eee',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 12,
    borderColor: '#aaa',
    borderWidth: 1,
  },
});

export default Restriction;
