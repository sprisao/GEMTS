import React from 'react';
import {useState, useEffect, useRef, useMemo} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import DoubleTab from '../../../utils/DoubleTab';

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

  // const [stores, setStores] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(_initialFocus);

  const tabRef = useRef();

  const thisUid = auth().currentUser.uid;

  let onEndReachedCalledDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [stores, setStores] = useState([]);

  const storesRef = firestore()
    .collection('stores_new')
    .where('firstCategoryId', 'array-contains', _firstCategoryId);

  /////////////////////// Data 가져오기 1차 시도
  // useEffect(() => {
  //   const storesRef = firestore()
  //     .collection('stores_new')
  //     .orderBy('preRating', 'desc')
  //     .where('firstCategoryId', 'array-contains', _firstCategoryId);

  //   const getStores = storesRef.onSnapshot(querySnapshot => {
  //     const data = [];

  //     querySnapshot.forEach(documentSnapshot => {
  //       data.push({
  //         ...documentSnapshot.data(),
  //         id: documentSnapshot.id,
  //       });
  //       setStores(data);
  //       setIsLoading(false);
  //     });
  //   });

  //   return () => getStores();
  // }, []);

  /////////////////// 2차 시도

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    setIsLoading(true);

    const snapshot = await storesRef.limit(50).get();

    if (!snapshot.empty) {
      let _stores = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        _stores.push(snapshot.docs[i].data());
      }

      setStores(_stores);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await storesRef.startAfter(lastDoc).limit(100).get();

        if (!snapshot.empty) {
          let newRestaurants = stores;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newRestaurants.push(snapshot.docs[i].data());
          }

          setStores(newRestaurants);
          if (snapshot.docs.length < 3) {
            setLastDoc(null);
          }
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  };

  function onCategorySelect(e) {
    setCurrentFocus(e);
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

  const onRefresh = () => {
    setTimeout(() => {
      getStores();
    }, 1000);
  };

  function tabs({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect(item.id)}
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

  const momoizedTabs = useMemo(() => tabs, [tabs]);

  function onDoubleTab(itemId, likes) {
    const addUid = firestore.FieldValue.arrayUnion(thisUid);
    const removeUid = firestore.FieldValue.arrayRemove(thisUid);
    if (likes == undefined) {
      firestore()
        .collection('stores_new')
        .doc(itemId)
        .update({
          likes: addUid,
        })
        .then(console.log('첫 좋아요'));
    } else if (likes.includes(thisUid)) {
      firestore()
        .collection('stores_new')
        .doc(itemId)
        .update({
          likes: removeUid,
        })
        .then(console.log('좋아요 취소'));
    } else {
      firestore()
        .collection('stores_new')
        .doc(itemId)
        .update({
          likes: addUid,
        })
        .then(console.log('좋아요'));
    }
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
          offset: 75 * (index + 1),
          index,
        })}
        renderItem={momoizedTabs}
      />

      <FlatList
        data={stores}
        windowSize={10}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => onRefresh()}
          />
        }
        onEndReachedThreshold={0.7}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
            getMore();
          }
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingHorizontal: 8,
        }}
        initialNumToRender={20}
        maxToRenderPerBatch={30}
        renderItem={({item}) => (
          // 여기서 나중에 높이 조절해야함 -> 스타일링 끝나고 마무리는 fixed height 설정 -> 렌더링 속도 업!
          <DoubleTab
            delay={250}
            onPress={() => console.log('한번 누름')}
            doublePress={() => onDoubleTab(item.id, item.likes)}
            containerStyle={{width: '48.5%', height: 265}}>
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
              {item.likes && item.likes.length > 0 ? (
                <Text>{item.likes.length}</Text>
              ) : null}
              <Text style={{fontSize: 20}}>{item.name}</Text>
              <Text>프로필</Text>
              <Text>
                영업시간 : {item.openHour} ~ {item.closeHour}
              </Text>
            </View>
          </DoubleTab>
        )}
      />
    </View>
  );
};

export default StoreDisplayScreen;
