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
  Dimensions,
} from 'react-native';
import { validatePassword, isValidEmail } from '../utils/index';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [pwdErrorMessage, setPwdErrorMessage] = useState(null);
  const [emptyErrorMessage, setEmptyErrorMessage] = useState(null);
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

  const displayEmptyErrorMsg = msg => {
    setEmptyErrorMessage(msg);

    setTimeout(() => {
      setEmptyErrorMessage(null);
    }, 5000);
  };

  const handleSignup = async () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      displayEmptyErrorMsg('Please fill in all fields');
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

    console.log('👤 Registering user...');

    const response = await createUser({ variables: { name, email, password } });
    dispatch(CreateUser(response.data.createUser.user));
    navigation.navigate('Onboard');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTag}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
        <Text style={styles.inputTag}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
        {emailErrorMessage && (
          <View>
            <Text>{emailErrorMessage}</Text>
          </View>
        )}
        <Text style={styles.inputTag}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={text => setPassword(text)}
        />
        <Text style={styles.inputTag}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          secureTextEntry={true}
          defaultValue={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {pwdErrorMessage && (
          <View>
            <Text>{pwdErrorMessage}</Text>
          </View>
        )}
        {emptyErrorMessage && (
          <View>
            <Text>{emptyErrorMessage}</Text>
          </View>
        )}
      </View>
      {loading ? (
        <Text>Creating your account...</Text>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'grey',
    marginTop: 10,
    borderWidth: 1.5,
    backgroundColor: '#FFC757',
    width: 180,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 100,
    width: Dimensions.get('screen').width - 100,
  },
  inputTag: {
    color: 'grey',
    fontWeight: '700',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    paddingLeft: 8,
    marginTop: 3,
    marginBottom: 10,
  },
});

export default Signup;
