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
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import { LOGIN_USER } from '../queries/DBqueries';
import { LoginUser } from '../redux/slices/userSlice';
import { useLazyQuery } from '@apollo/client';
import { CardStyleInterpolators } from '@react-navigation/stack';

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
      navigation.navigate('Home');
    }
  }, [data]);

  return (
    <View>
      {!showLogin ? (
        <View style={styles.loadingScreen}>
          <Text>Logging in...</Text>
          <ActivityIndicator size={100} color='#89b337' />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
            }}
            resizeMode='cover'
            style={styles.background}
          > */}
          <Image
            style={styles.logo}
            source={require('../assets/logo_transparent.png')}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputTag}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Email'
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.inputTag}>Password</Text>
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
            <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
              <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          {/* </ImageBackground> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    /* marginTop: 20, */
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingScreen: {
    paddingTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: 0,
  },
  background: {
    // height: Dimensions.get('screen').height - 80,
    width: Dimensions.get('screen').width,
  },
  inputContainer: {
    marginTop: 200,
    width: Dimensions.get('screen').width - 80,
    // position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    padding: 5,
    marginTop: 3,
    marginBottom: 10,
  },
  inputTag: {
    color: 'grey',
    fontWeight: '700',
  },
  btnContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 12,
    borderColor: 'gray',
    marginBottom: 10,
    borderWidth: 1.5,
    // backgroundColor: '#9AC544',
    // backgroundColor: '#89b337',
    backgroundColor: '#FFC757',
    width: 180,
    padding: 8,
  },
  btnText: {
    color: '#37392E',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
