import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Restriction = ({
  restriction,
  selectedRestrictions,
  setSelectedRestrictions,
}) => {
  const initialStatus = selectedRestrictions.includes(restriction.id);
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
            ? styles.pressedRestrictionContainer
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
    fontSize: 16,
  },
  pressedRestrictionContainer: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'chocolate',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  restrictionContainer: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#eee',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
});

export default Restriction;
