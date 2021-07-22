import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Onboard = () => {
  const [date, setDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <View>
        <Text>Biological Sex:</Text>
        <RNPickerSelect
          onValueChange={value => console.log(value)}
          // placeholder={{ label: 'sex', value: null }}
          items={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Onboard;
