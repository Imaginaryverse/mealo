import React, { useState } from 'react';
import { CREATE_USER } from '../queries/DBqueries';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
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

// TOODO: Encrypt password!
// encrept password
// const encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const Signup = ({ navigation, setUser, setLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { loading, data }] = useMutation(CREATE_USER);

  /*
    /^[a-z0-9.\-_]+@[a-z0-9\-]+.[a-z]{2,}$/i
  */

  const handleSignup = async () => {
    console.log('in handle singup');
    if (password !== confirmPassword) {
      console.log('passwords not matching');
      return;
    }
    if (!/^[a-z0-9.\-_]+@[a-z0-9\-]+.[a-z]{2,}$/i.test(email)) {
      console.log('invalid email format');
      return;
    }

    await createUser();
    console.log(data);
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
        <TouchableOpacity onPress={() => handleSignup()}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
