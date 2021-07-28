import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { LOGIN_USER } from '../queries/DBqueries';
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
        <Text>Logging in...</Text>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
            }}
            resizeMode='cover'
            style={styles.background}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Email'
                defaultValue={email}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                defaultValue={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            {loginErrorMsg && (
              <View>
                <Text>{loginErrorMsg}</Text>
              </View>
            )}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleLogin()}
              >
                <Text style={styles.btnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.btnText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  inputContainer: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 5,
  },
  btnContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 1.5,
    backgroundColor: 'linen',
    width: Dimensions.get('screen').width / 2.5,
    padding: 5,
  },
  btnText: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Login;
