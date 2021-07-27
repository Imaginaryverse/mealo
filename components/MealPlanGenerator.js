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
      <Text>Meal Plan Generator</Text>

      <Text>
        If you have any dietary restrictions, select them and click the save
        button. When you are ready, click 'Generate Meal Plan' and we will try
        to generate a meal plan for you!
      </Text>

      <Text>Dietary Restrictions:</Text>
      <View>
        {data && (
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
        )}
        {user.restrictions !== selectedRestrictions && (
          <Button title='Save' onPress={() => onRestrictionSave()} />
        )}
      </View>

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
