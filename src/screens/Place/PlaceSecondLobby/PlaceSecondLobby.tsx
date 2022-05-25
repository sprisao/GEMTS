import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';

import {StoreSecondCat} from '../../../../data/StoreSecondCat';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGlobalContext} from '../../../Contexts/placeContext.';

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
  const _firstCategoryId = route.params.firstCategoryId;
  const {getStores, stores} = useGlobalContext();

  useEffect(() => {
    getStores(_firstCategoryId);
  }, []);

  const thisSecondCategories = allSecondCategory.filter(
    item => item.firstCategoryId === _firstCategoryId,
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
