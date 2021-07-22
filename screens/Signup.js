import React, { useState } from 'react';
import { CREATE_USER } from '../queries/DBqueries';
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

// TOODO: Encrypt password!
// encrept password
// const encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const Signup = ({ navigation, setUser, setLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { loading, data }] = useMutation(CREATE_USER);

  const handleSignup = async () => {
    console.log('Signing up...');

    const pwdValidation = validatePassword(password, confirmPassword);

    if (!pwdValidation.valid) {
      console.log(pwdValidation.message);
      return;
    }

    if (!isValidEmail(email)) {
      console.log('invalid email format');
      return;
    }

    const response = await createUser({ variables: { name, email, password } });
    console.log(response);
    setLoggedIn(true);
    setUser(response.data.createUser.user);

    navigation.navigate('Home');
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
