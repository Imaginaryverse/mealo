import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation, route }) => {
  const user = useSelector(state => state.user);
  const { destination } = route.params;

  useEffect(() => {
    if (user) navigation.navigate(destination);
  }, [user]);

  return (
    <View style={styles.container}>
      {destination === 'Home' ? (
        <Text>Logging in...</Text>
      ) : (
        <Text>Creating your account...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default LoadingScreen;
