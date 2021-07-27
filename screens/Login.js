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

import { LOGIN_USER, GET_MEALPLAN_FROM_DB } from '../queries/DBqueries';
import { LoginUser } from '../redux/slices/userSlice';
import { useLazyQuery } from '@apollo/client';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [loginUser, { loading, data, called }] = useLazyQuery(LOGIN_USER, {
    fetchPolicy: 'network-only',
  });

  const dispatch = useDispatch();

  const displayLoginErrorMsg = msg => {
    setLoginErrorMsg(msg);

    setTimeout(() => {
      setLoginErrorMsg(null);
    }, 5000);
  };

  const handleLogin = () => {
    if (email === '' || password === '') return;

    loginUser({ variables: { email, password } });
    setEmail('');
    setPassword('');
    setShowLogin(false);
  };

  useEffect(() => {
    loading && console.log('🪵 Logging in...');
  }, [loading]);

  useEffect(() => {
    if (data && !data.LoginUserByEmail.success) {
      setShowLogin(true);
      displayLoginErrorMsg(data.LoginUserByEmail.message);
    }

    if (data && data.LoginUserByEmail.success) {
      setShowLogin(false);
      dispatch(LoginUser(data.LoginUserByEmail.user));
      console.log(`🪵 Logged in ${data.LoginUserByEmail.user.databaseId}...`);
    }
  }, [data]);

  return (
    <View>
      {!showLogin ? (
        <Text>Loggin in...</Text>
      ) : (
        <View>
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
          {loginErrorMsg && (
            <View>
              <Text>{loginErrorMsg}</Text>
            </View>
          )}
          <Button title='Log in' onPress={() => handleLogin()} />
          <Button
            title='Create Account'
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      )}
    </View>
  );
};

export default Login;
