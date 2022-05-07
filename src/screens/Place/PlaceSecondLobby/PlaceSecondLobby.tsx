import {View, Text} from 'react-native';
import React from 'react';

import {StoreSecondCat} from '../../../../data/StoreSecondCat';

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
  const SecondCategories = StoreSecondCat;

  const givenFirstCategoryId = route.params.firstCategoryId;

  return (
    <View>
      {SecondCategories.map(item => {
        if (item.firstCategoryId == givenFirstCategoryId) {
          return <Text id={item.id}>{item.title}</Text>;
        }
      })}
    </View>
  );
};

export default PlaceSecondLobby;
