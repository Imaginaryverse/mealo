import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { getUserAge, capitalizeName } from '../utils';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/slices/userSlice';
import { UPDATE_USER_PROFILE } from '../queries/DBqueries';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(LogoutUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Name:</Text>
          <Text style={styles.detailValue}>{capitalizeName(user.name)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Age: </Text>
          <Text style={styles.detailValue}>
            {getUserAge(user.profile.birthdate)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Birthdate:</Text>
          <Text style={styles.detailValue}>
            {user.profile.birthdate.substring(0, 10)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Biological Sex:</Text>
          <Text style={styles.detailValue}>{user.profile.biologicalSex}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Height:</Text>
          <Text style={styles.detailValue}>{user.profile.height} cm</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailName}>Weight:</Text>
          <Text style={styles.detailValue}>
            {user.profile.startingWeight} kg
          </Text>
        </View>

        {/*   <Text>Name: {capitalizeName(user.name)}</Text>
        <Text>Age: {getUserAge(user.profile.birthdate)}</Text>
        <Text>Sex: {user.profile.biologicalSex}</Text>
        <Text>Birthdate: {user.profile.birthdate.substring(0, 10)}</Text>
        <Text>Height: {user.profile.height} cm</Text>
        <Text>Weight: {user.profile.startingWeight} kg</Text> */}
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleSignOut()}>
        <Text style={{ marginRight: 5 }}>Sign Out</Text>
        <Icon name='ios-log-out-outline' size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1.5,
    // backgroundColor: '#FEC05D',
    backgroundColor: '#FFC757',
    width: Dimensions.get('screen').width / 2.5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailName: {
    fontWeight: '700',
    color: 'grey',
    marginRight: 5,
  },
});

export default Profile;
