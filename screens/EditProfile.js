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
      console.log('👤 Profile saved...');

      // TODO: FIX HERE! birthdate doesn't work on profile page

      /* dispatch(
        UpdateUserProfileState({
          userId: user.databaseId,
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
      ); */
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
        <Text>Activity Level: {activityLevel}</Text>
        <RNPickerSelect
          onValueChange={value => setActivityLevel(value)}
          items={[
            { label: 'Not Active', value: 'NOT_ACTIVE' },
            { label: '1 - 2 times per week', value: 'EXERCISE_1' },
            { label: '3+ times per week', value: 'EXERCISE_2' },
          ]}
        />

        <Text>Weight Goal: {weightGoal}</Text>
        <RNPickerSelect
          onValueChange={value => setWeightGoal(value)}
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

export default EditProfile;
