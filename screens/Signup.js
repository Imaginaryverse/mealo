import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER } from '../queries/DBqueries';
import { CreateUser } from '../redux/slices/userSlice';
import { useMutation, gql } from '@apollo/client';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { validatePassword, isValidEmail } from '../utils/index';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [pwdErrorMessage, setPwdErrorMessage] = useState(null);
  const [createUser, { loading, data }] = useMutation(CREATE_USER);

  const dispatch = useDispatch();

  const displayEmailErrorMsg = msg => {
    setEmailErrorMessage(msg);

    setTimeout(() => {
      setEmailErrorMessage(null);
    }, 5000);
  };

  const displayPwdErrorMsg = msg => {
    setPwdErrorMessage(msg);

    setTimeout(() => {
      setPwdErrorMessage(null);
    }, 5000);
  };

  const handleSignup = async () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      console.log('Empty fields...');
      return;
    }

    const pwdValidation = validatePassword(password, confirmPassword);

    if (!pwdValidation.valid) {
      displayPwdErrorMsg(pwdValidation.message);
      return;
    }

    if (!isValidEmail(email)) {
      displayEmailErrorMsg('Invalid email format...');
      return;
    }

    console.log('Registering user...');

    const response = await createUser({ variables: { name, email, password } });
    dispatch(CreateUser(response.data.createUser.user));
    navigation.navigate('Onboard');
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <Text>Create Account</Text>
        <TextInput
          placeholder='name'
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder='email'
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
        {emailErrorMessage && (
          <View>
            <Text>{emailErrorMessage}</Text>
          </View>
        )}
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          placeholder='confirm password'
          secureTextEntry={true}
          defaultValue={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {pwdErrorMessage && (
          <View>
            <Text>{pwdErrorMessage}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleSignup}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        {data && (
          <>
            <Text>{data.createUser.message}</Text>
            <Text>{data.createUser.user.databaseId}</Text>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
