import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Button,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Restriction } from '../components';
import {
  GET_ALL_RESTRICTIONS,
  PROFILE_RESTRICTIONS_UPDATE,
} from '../queries/DBqueries';
import { UpdateUserRestrictionsState } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const MealPlanGenerator = ({ handleMealPlanClick }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_ALL_RESTRICTIONS);
  const [
    updateRestrictions,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(PROFILE_RESTRICTIONS_UPDATE);
  const [showRestrictions, setShowRestrictions] = useState(false);
  const [selectedRestrictions, setSelectedRestrictions] = useState(
    user.restrictions
  );

  const onRestrictionSave = () => {
    dispatch(UpdateUserRestrictionsState(selectedRestrictions));
    updateRestrictions({
      variables: {
        userId: user.databaseId,
        restrictions: selectedRestrictions,
      },
    });
    setShowRestrictions(!showRestrictions);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowRestrictions(!showRestrictions)}
        style={styles.restrictionsContainer}
      >
        <Text>Dietary Restrictions:</Text>
        <Icon
          name={showRestrictions ? 'ios-chevron-up' : 'ios-chevron-down'}
          size={25}
        />
      </Pressable>
      {showRestrictions && (
        <View>
          <FlatList
            data={data.getAllRestrictions}
            renderItem={({ item }) => (
              <Restriction
                restriction={item}
                selectedRestrictions={selectedRestrictions}
                setSelectedRestrictions={setSelectedRestrictions}
              />
            )}
            numColumns={4}
            keyExtractor={(item, i) => i.toString()}
          />
          <Button title='Save' onPress={() => onRestrictionSave()} />
        </View>
      )}

      <Pressable onPress={() => handleMealPlanClick()}>
        <Text>Generate Meal Plan</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  restrictionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealPlanGenerator;
