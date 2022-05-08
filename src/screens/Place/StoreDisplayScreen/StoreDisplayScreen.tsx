import React from 'react';
import {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

type StoreDisplayScreenNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type StoreDisplayScreenRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type Props = {};

const StoreDisplayScreen = (props: Props) => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const route = useRoute<StoreDisplayScreenRouteProp>();
  const navigation = useNavigation<StoreDisplayScreenNavigationProp>();

  const _firstCategoryId = route.params.firstCategoryId;
  const _initialFocus = route.params.initialFocus;

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    setIsLoading(true);

    const storesRef = firestore()
      .collection('stores_new')
      .orderBy('preRating', 'desc')
      .where('firstCategoryId', 'array-contains', _firstCategoryId);

    function onError(error) {
      console.log(error);
    }
    const _Stores = await storesRef.onSnapshot(querySnapshot => {
      const stores = [];
      try {
        querySnapshot.forEach(documentSnapshot => {
          stores.push({
            ...documentSnapshot.data(),
          });
          setStores(stores);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    }, onError);

    return () => _Stores();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View style={{paddingHorizontal: 8, paddingTop: 10}}>
        <FlatList
          data={stores}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          initialNumToRender={10}
          renderItem={({item}) => (
            <View style={{width: '48.5%'}}>
              <View
                style={{
                  width: '100%',
                  height: 185,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                <FastImage
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item.images[0].url}}
                />
              </View>
              <View style={{marginTop: 5}}>
                <Text>{item.shortAddr}</Text>
                <Text style={{fontSize: 20}}>{item.name}</Text>
                <Text>프로필</Text>
                <Text>
                  영업시간 : {item.openHour} ~ {item.closeHour}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default StoreDisplayScreen;
