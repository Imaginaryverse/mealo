import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
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

    updateProfile({
      variables: updatedProfile,
    });
  };

  useEffect(() => {
    if (data && data.updateUserProfile) {
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
      navigation.navigate('Profile');
    }
  }, [data]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label='Height (cm)'
          placeholder={profile.height ? `${profile.height}` : 'Height'}
          leftIcon={<Icon name='ios-body' size={24} color='black' />}
          onChangeText={value => setHeight(value)}
          keyboardType='number-pad'
          style={styles.inputField}
        />
        <Input
          label='Weight (kg)'
          placeholder={
            profile.startingWeight ? `${profile.startingWeight}` : 'Weight'
          }
          leftIcon={<Icon name='ios-body' size={24} color='black' />}
          onChangeText={value => setWeight(value)}
          keyboardType='number-pad'
        />

        <Input
          label='Target Weight (kg)'
          placeholder={
            profile.targetWeight ? `${profile.targetWeight}` : 'Target Weight'
          }
          leftIcon={<Icon name='ios-body' size={24} color='black' />}
          onChangeText={value => setTargetWeight(value)}
          keyboardType='number-pad'
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.optionName}>
            Activity Level: {selectedActivityLevel}
          </Text>
          <RNPickerSelect
            onValueChange={value => setActivityState(value)}
            items={[
              { label: 'Not Active', value: 'Not Active' },
              { label: '1 - 2 times per week', value: '1 - 2 times per week' },
              { label: '3+ times per week', value: '3+ times per week' },
            ]}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.optionName}>
            Weekly Weight Goal: {selectedWeightGoal}
          </Text>
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
      </View>
      <Text style={{ marginTop: 10, textAlign: 'center', width: 350 }}>
        It is highly recommended that you generate a new meal plan after
        updating your profile.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={() => onSave()}>
        <Text style={styles.btnText}>Save Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: Dimensions.get('screen').width - 20,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: 'grey',
    backgroundColor: '#FFC757',
    width: Dimensions.get('screen').width / 2.5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  optionName: {
    marginLeft: 10,
    fontSize: 16,
    color: 'grey',
    fontWeight: '700',
  },
});

export default EditProfile;
