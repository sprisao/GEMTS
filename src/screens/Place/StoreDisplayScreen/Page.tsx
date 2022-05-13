import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, RefreshControl} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TouchableOpacity from '../../../utils/DoubleTab';
import FastImage from 'react-native-fast-image';

const Page = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [stores, setStores] = useState([]);

  const _firstCategoryId = props.firstCategoryId;
  const _secondCategoryId = props.secondCategoryId;

  let onEndReachedCalledDuringMomentum = false;

  const storesRef = firestore()
    .collection('stores_new')
    .orderBy('preRating', 'desc')
    .where('firstCategoryId', 'array-contains', _firstCategoryId);

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
      }, 200);
    }
    onEndReachedCalledDuringMomentum = true;
  };
  const onRefresh = () => {
    setTimeout(() => {
      getStores();
    }, 1000);
  };

  console.log(_secondCategoryId);
  const thisPageData = stores.filter(
    data => data.secondCategoryId == _secondCategoryId,
  );

  return (
    <>
      <FlatList
        // data={stores}
        data={_secondCategoryId === 'all' ? stores : thisPageData}
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
          <TouchableOpacity
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
          </TouchableOpacity>
        )}
      />
    </>
  );
};
export default Page;
