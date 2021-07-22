import React from 'react';
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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title='Log in' />
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
