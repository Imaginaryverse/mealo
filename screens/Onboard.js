import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Slider, Switch } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '../queries/DBqueries';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../utils';
import { UpdateUserProfileState } from '../redux/slices/userSlice';

const Onboard = ({ navigation }) => {
  const currentDate = new Date();
  const userId = useSelector(state => state.user.databaseId);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [updateProfile, { data }] = useMutation(UPDATE_USER_PROFILE);
  const [biologicalSex, setBiologicalSex] = useState(null);
  const [birthdate, setBirthdate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear() - 18,
  });

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(null);

  const [activityLevel, setActivityLevel] = useState(0);
  const [weightGoal, setWeightGoal] = useState('');

  const onSave = () => {
    const profile = {
      userId,
      biologicalSex,
      birthdate: formatDate(birthdate),
      height: Number(height),
      startingWeight: Number(weight),
      targetWeight: Number(targetWeight),
      activityLevel,
      weeklyWeightGoal: weightGoal,
      goalsOn: true,
    };

    console.log('👤 Saving profile...');

    updateProfile({
      variables: profile,
    });
  };

  useEffect(() => {
    if (data && data.updateUserProfile) {
      console.log('👤 Profile saved...');
      dispatch(
        UpdateUserProfileState({
          userId,
          biologicalSex,
          birthdate: formatDate(birthdate),
          height: Number(height),
          startingWeight: Number(weight),
          targetWeight: Number(targetWeight),
          activityLevel,
          weeklyWeightGoal: weightGoal,
          goalsOn: true,
          bmr: data.updateUserProfile.bmr,
          cd: data.updateUserProfile.cd,
          dcig: data.updateUserProfile.dcig,
          tdee: data.updateUserProfile.tdee,
        })
      );
      navigation.navigate('Home');
    }
  }, [data]);

  const updateBirthdate = (field, num) => {
    switch (field) {
      case 'day':
        if (num < 1 || num > 31) {
          return;
        }
        setBirthdate(prevState => {
          return {
            ...prevState,
            day: num,
          };
        });
        break;
      case 'month':
        if (num < 1 || num > 12) {
          return;
        }
        setBirthdate(prevState => {
          return {
            ...prevState,
            mon: num,
          };
        });
        break;
      case 'year':
        if (num < 1900 || num > currentDate.getFullYear() - 18) {
          return;
        }
        setBirthdate(prevState => {
          return {
            ...prevState,
            year: num,
          };
        });
        break;
      default:
        return;
    }
  };

  /* useEffect(() => {
    console.log({
      biologicalSex,
      birthdate,
      height,
      weight,
      targetWeight,
      activityLevel,
      weightGoal,
    });
  }, [
    biologicalSex,
    birthdate,
    height,
    weight,
    targetWeight,
    activityLevel,
    weightGoal,
  ]); */

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <View>
        <Text>Biological Sex: {biologicalSex}</Text>
        <RNPickerSelect
          onValueChange={value => setBiologicalSex(value)}
          // placeholder={{ label: 'sex', value: null }}
          items={[
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
          ]}
        />
        <View>
          <Text>Birthdate:</Text>
          <TextInput
            placeholder='DD'
            defaultValue={`${birthdate.day}`}
            onChangeText={num => updateBirthdate('day', num)}
            maxLength={2}
            keyboardType='number-pad'
          />
          <TextInput
            placeholder='MM'
            defaultValue={`${birthdate.month}`}
            onChangeText={num => updateBirthdate('month', num)}
            maxLength={2}
            keyboardType='number-pad'
          />
          <TextInput
            placeholder='YYYY'
            defaultValue={`${birthdate.year}`}
            onChangeText={num => updateBirthdate('year', num)}
            maxLength={4}
            keyboardType='number-pad'
          />
        </View>

        <Input
          label='Height (cm)'
          placeholder='Height'
          leftIcon={<Icon name='user' size={24} color='black' />}
          onChangeText={value => setHeight(value)}
          keyboardType='number-pad'
        />
        <Input
          label='Weight (kg)'
          placeholder='Weight'
          leftIcon={<Icon name='user' size={24} color='black' />}
          onChangeText={value => setWeight(value)}
          keyboardType='number-pad'
        />

        <Input
          label='Target Weight (kg)'
          placeholder='Target Weight'
          leftIcon={<Icon name='user' size={24} color='black' />}
          onChangeText={value => setTargetWeight(value)}
          keyboardType='number-pad'
        />
        <Text>Activity Level: {activityLevel}</Text>
        <RNPickerSelect
          onValueChange={value => setActivityLevel(value)}
          // placeholder={{ label: 'sex', value: null }}
          items={[
            { label: 'Not Active', value: 'NOT_ACTIVE' },
            { label: '1 - 2 times per week', value: 'EXERCISE_1' },
            { label: '3+ times per week', value: 'EXERCISE_2' },
          ]}
        />

        <Text>Weight Goal: {weightGoal}</Text>
        <RNPickerSelect
          onValueChange={value => setWeightGoal(value)}
          // placeholder={{ label: 'sex', value: null }}
          items={[
            { label: 'Maintain', value: 'MAINTAIN' },
            { label: '0.25kg', value: 'GOAL_1' },
            { label: '0.5kg', value: 'GOAL_2' },
            { label: '0.75kg', value: 'GOAL_3' },
            { label: '2kg', value: 'GOAL_4' },
          ]}
        />
      </View>
      <Pressable onPress={() => onSave()}>
        <Text>Save Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Onboard;
