import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../queries/DBqueries';
import { LoginUser } from '../redux/slices/userSlice';

// TODO: implement error messaging

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, data }] = useLazyQuery(LOGIN_USER);
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log('Logging in...');
    loginUser({ variables: { email, password } });
  };

  useEffect(() => {
    loading && console.log('Loading...');
  }, [loading]);

  useEffect(() => {
    data && console.log('Data state changed...');
    data && console.log(data);
    if (data && data.LoginUserByEmail.success) {
      dispatch(LoginUser(data.LoginUserByEmail.user));
      navigation.navigate('Home');
    }
  }, [data]);

  return (
    <View>
      <Text>Login</Text>
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
      <Button title='Log in' onPress={() => handleLogin()} />
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
