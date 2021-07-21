import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder='email' />
      <TextInput placeholder='password' secureTextEntry={true} />
      <Button title='Log in' />
      <Button
        title='Create Account'
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
