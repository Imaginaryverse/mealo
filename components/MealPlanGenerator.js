import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Restriction } from '../components';
import {
  GET_ALL_RESTRICTIONS,
  PROFILE_RESTRICTIONS_UPDATE,
} from '../queries/DBqueries';
import { UpdateUserRestrictionsState } from '../redux/slices/userSlice';

const MealPlanGenerator = ({ handleMealPlanClick }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_ALL_RESTRICTIONS);
  const [
    updateRestrictions,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(PROFILE_RESTRICTIONS_UPDATE);

  const [selectedRestrictions, setSelectedRestrictions] = useState(
    user.restrictions || []
  );

  const onRestrictionSave = () => {
    dispatch(UpdateUserRestrictionsState(selectedRestrictions));
    updateRestrictions({
      variables: {
        userId: user.databaseId,
        restrictions: selectedRestrictions,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Meal Plan Generator</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          1. Select your dietary restrictions (optional)
        </Text>
        <Text style={styles.instructionsText}>2. Press 'Save' when done</Text>
        <Text style={styles.instructionsText}>
          3. Press 'Generate' to generate your meal plan
        </Text>
      </View>

      <View style={styles.restrictionsContainer}>
        <Text style={styles.restrictionsTitle}>Dietary Restrictions</Text>
        <View style={styles.restrictionsList}>
          {data &&
            data.getAllRestrictions &&
            data.getAllRestrictions.map((restriction, index) => (
              <Restriction
                restriction={restriction}
                selectedRestrictions={selectedRestrictions}
                setSelectedRestrictions={setSelectedRestrictions}
                key={index}
              />
            ))}
        </View>
        {user.restrictions !== selectedRestrictions && (
          <View style={styles.saveBtn}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onRestrictionSave()}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Pressable style={styles.btn} onPress={() => handleMealPlanClick()}>
        <Text style={styles.btnText}>Generate</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  pageHeader: {
    fontSize: 22,
    color: 'black',
  },
  instructionsContainer: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1.2,
    backgroundColor: '#eee',
  },
  instructionsText: {
    color: '#555',
  },
  restrictionsContainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 10,
    borderRadius: 12,
    borderColor: '#aaa',
    borderWidth: 1.2,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  restrictionsTitle: {
    fontSize: 16,
  },
  restrictionsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 13,
  },
  btn: {
    height: 40,
    borderRadius: 12,
    borderColor: 'gray',
    marginTop: 20,
    borderWidth: 1.5,
    backgroundColor: '#FFC757',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#37392E',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MealPlanGenerator;
