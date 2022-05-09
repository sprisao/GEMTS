import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

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

interface Props {}

const StoreDisplayScreen = ({}: Props) => {
  const route = useRoute<StoreDisplayScreenRouteProp>();
  const navigation = useNavigation<StoreDisplayScreenNavigationProp>();

  const _firstCategoryId = route.params.firstCategoryId;
  const _secondCategories = route.params.secondCategories;
  const _initialFocus = route.params.initialFocus;

  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(_initialFocus);

  const tabRef = useRef();

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

  function onCategorySelect(e) {
    setCurrentFocus(e);
    console.log(tabRef.current.scrollToItem(e));
    tabRef.current.scrollToItem(e);
  }

  function allTab() {
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect('all')}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={currentFocus == 'all' ? {color: 'red'} : {color: 'white'}}>
          전체
        </Text>
      </TouchableOpacity>
    );
  }

  function tabs(item) {
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect(item)}
        key={item.id}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={currentFocus == item.id ? {color: 'red'} : {color: 'white'}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{}}>
      <FlatList
        ref={tabRef}
        style={{backgroundColor: 'blue', height: 50, marginBottom: 8}}
        horizontal
        data={_secondCategories}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={allTab}
        getItemLayout={(data, index) => ({
          length: 75,
          offset: 75 * index,
          index,
        })}
        renderItem={({item}) => tabs(item)}
      />
      <FlatList
        data={stores}
        windowSize={10}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingHorizontal: 8,
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={30}
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
  );
};

export default StoreDisplayScreen;
