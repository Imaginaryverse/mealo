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
import { set } from 'react-native-reanimated';

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
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');
  const [selectedWeightGoal, setSelectedWeightGoal] = useState('');

  const setActivityState = value => {
    switch (value) {
      case '1 - 2 times per week':
        setActivityLevel('EXERCISE_1');
        break;
      case '3+ times per week':
        setActivityLevel('EXERCISE_2');
        break;
      default:
        setActivityLevel('NOT_ACTIVE');
    }
    setSelectedActivityLevel(value);
  };

  const setWeightGoalState = value => {
    switch (value) {
      case '0.25kg':
        setWeightGoal('GOAL_1');
        break;
      case '0.5kg':
        setWeightGoal('GOAL_2');
        break;
      case '0.75kg':
        setWeightGoal('GOAL_3');
        break;
      case '2kg':
        setWeightGoal('GOAL_4');
        break;
      default:
        setWeightGoal('MAINTAIN');
    }
    setSelectedWeightGoal(value);
  };

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

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <View>
        <Text>Biological Sex: {biologicalSex}</Text>
        <RNPickerSelect
          onValueChange={value => setBiologicalSex(value)}
          items={[
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' },
          ]}
        />
        <View>
          <Text>Birthdate:</Text>
          <View style={styles.dateContainer}>
            <TextInput
              placeholder='YYYY'
              onChangeText={num => updateBirthdate('year', num)}
              maxLength={4}
              keyboardType='number-pad'
            />
            <TextInput
              placeholder='MM'
              onChangeText={num => updateBirthdate('month', num)}
              maxLength={2}
              keyboardType='number-pad'
            />
            <TextInput
              placeholder='DD'
              onChangeText={num => updateBirthdate('day', num)}
              maxLength={2}
              keyboardType='number-pad'
            />
          </View>
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
        <Text>Activity Level: {selectedActivityLevel}</Text>
        <RNPickerSelect
          onValueChange={value => setActivityState(value)}
          items={[
            { label: 'Not Active', value: 'Not Active' },
            { label: '1 - 2 times per week', value: '1 - 2 times per week' },
            { label: '3+ times per week', value: '3+ times per week' },
          ]}
        />

        <Text>Weight Goal: {selectedWeightGoal}</Text>
        <RNPickerSelect
          onValueChange={value => setWeightGoalState(value)}
          // placeholder={{ label: 'sex', value: null }}
          items={[
            { label: 'Maintain', value: 'Maintain' },
            { label: '0.25kg', value: '0.25kg' },
            { label: '0.5kg', value: '0.5kg' },
            { label: '0.75kg', value: '0.75kg' },
            { label: '2kg', value: '2kg' },
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
  dateContainer: {
    flexDirection: 'row',
  },
});

export default Onboard;
