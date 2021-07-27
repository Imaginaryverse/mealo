import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from '@apollo/client';
import { UpdateUserProfileState, LogoutUser } from '../redux/slices/userSlice';
import { UPDATE_USER_PROFILE } from '../queries/DBqueries';

const EditProfile = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const profile = user.profile;
  const [updateProfile, { loading, error, data }] =
    useMutation(UPDATE_USER_PROFILE);
  const dispatch = useDispatch();

  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.startingWeight);
  const [targetWeight, setTargetWeight] = useState(profile.targetWeight);

  const [activityLevel, setActivityLevel] = useState(profile.activityLevel);
  const [weightGoal, setWeightGoal] = useState(profile.weeklyWeightGoal);
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
    const updatedProfile = {
      userId: user.databaseId,
      biologicalSex: profile.biologicalSex,
      birthdate: profile.birthdate,
      height: Number(height),
      startingWeight: Number(weight),
      targetWeight: Number(targetWeight),
      activityLevel,
      weeklyWeightGoal: weightGoal,
      goalsOn: true,
    };

    console.log('👤 Updating profile...');

    updateProfile({
      variables: updatedProfile,
    });
  };

  useEffect(() => {
    if (data && data.updateUserProfile) {
      // TODO: FIX HERE! birthdate doesn't work on profile page

      dispatch(
        UpdateUserProfileState({
          userId: user.databaseId,
          biologicalSex: profile.biologicalSex,
          birthdate: profile.birthdate,
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
      console.log('👤 Profile saved...');
      navigation.navigate('Profile');
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <View>
        <Input
          label='Height (cm)'
          placeholder={profile.height ? `${profile.height}` : 'Height'}
          leftIcon={<Icon name='user' size={24} color='black' />}
          onChangeText={value => setHeight(value)}
          keyboardType='number-pad'
        />
        <Input
          label='Weight (kg)'
          placeholder={
            profile.startingWeight ? `${profile.startingWeight}` : 'Weight'
          }
          leftIcon={<Icon name='user' size={24} color='black' />}
          onChangeText={value => setWeight(value)}
          keyboardType='number-pad'
        />

        <Input
          label='Target Weight (kg)'
          placeholder={
            profile.targetWeight ? `${profile.targetWeight}` : 'Target Weight'
          }
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

        <Text>Weekly Weight Goal: {selectedWeightGoal}</Text>
        <RNPickerSelect
          onValueChange={value => setWeightGoalState(value)}
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
});

export default EditProfile;
