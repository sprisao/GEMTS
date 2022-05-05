import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';

type placeSecondLobbyNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type placeSecondLobbyRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

interface Props {}
const PlaceSecondLobby = ({}: Props) => {
  const route = useRoute<placeSecondLobbyRouteProp>();
  const navigation = useNavigation<placeSecondLobbyNavigationProp>();

  const firstCategory = route.params.firstCategoryId;
  return (
    <View>
      <Text>{firstCategory}</Text>
    </View>
  );
};

export default PlaceSecondLobby;
