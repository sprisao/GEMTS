import {TouchableOpacity, View, Text, FlatList} from 'react-native';
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

  const allSecondCategory = StoreSecondCat;
  const givenFirstCategoryId = route.params.firstCategoryId;

  const thisSecondCategories = allSecondCategory.filter(
    item => item.firstCategoryId === givenFirstCategoryId,
  );

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoreDisplay', {
            firstCategoryId: item.firstCategoryId,
            initialFocus: item.id,
            secondCategoryId: item.id,
            secondCategories: thisSecondCategories,
          })
        }
        style={{
          width: '49%',
          borderWidth: 0.5,
          borderColor: '#dfdfdf',
          borderRadius: 11,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 14,
            paddingVertical: 12,
          }}>
          <Text style={{marginRight: 6}}>{item.emoji}</Text>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('StoreDisplay', {
              firstCategoryId: 'none',
              initialFocus: 'all',
              secondCategoryId: 'all',
              secondCategories: thisSecondCategories,
            })
          }
          style={{
            width: '100%',
            borderWidth: 0.5,
            borderColor: '#dfdfdf',
            borderRadius: 11,
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}>
            <Text style={{marginRight: 6}}>🅰️</Text>
            <Text>전체</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          data={thisSecondCategories}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default PlaceSecondLobby;
