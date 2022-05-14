import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import FastImage from 'react-native-fast-image';

import DoubleTab from '../../../utils/DoubleTab';

const deviceWidth = Dimensions.get('window').width;

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
  const _secondCategoryId = route.params.secondCategoryId;
  const _secondCategories = route.params.secondCategories;
  const _initialFocus = route.params.initialFocus;
  // const [stores, setStores] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(_initialFocus);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRef = useRef();
  const pageRef = useRef();

  const thisUid = auth().currentUser.uid;

  let onEndReachedCalledDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [stores, setStores] = useState([]);

  const initialIndex = [];

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

  function onCategorySelect(e) {
    setCurrentFocus(e);
    console.log(e);
    pageRef.current.scrollToIndex({
      animated: true,
      index: e,
      viewPosition: 0,
    });
  }

  const onRefresh = () => {
    setTimeout(() => {
      getStores();
    }, 1000);
  };

  function tabs({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect(index)}
        key={item.id}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={currentFocus == index ? {color: 'red'} : {color: 'white'}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderPage({item, index}) {
    //여기서 각 렌더링 된 페이지마다 표시될 데이터를 필터링 하면 된다.
    const thisPageData = stores.filter(
      doc => doc.secondCategoryId[0] == item.id,
    );

    return (
      <View style={{width: deviceWidth}}>
        <FlatList
          data={item.id == 'all' ? stores : thisPageData}
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
  }

  const memoizedTabs = useMemo(() => tabs, [tabs]);
  const memoizedPage = useMemo(() => renderPage, [renderPage]);

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

  const scrollHandler = e => {
    const offset = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(offset / deviceWidth);
    const selectedIndex = Platform.OS === 'ios' ? pageIndex : pageIndex;

    setCurrentFocus(selectedIndex);
    setSelectedIndex(selectedIndex);
    if (offset > 0) {
      tabRef.current.scrollToIndex({
        animated: true,
        index: selectedIndex,
        viewPosition: 0.5,
      });
    }
  };

  return (
    <View style={{}}>
      <FlatList
        ref={tabRef}
        style={{backgroundColor: 'blue', height: 50, marginBottom: 8}}
        horizontal
        data={_secondCategories}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 75,
          offset: 75 * (index + 1),
          index,
        })}
        renderItem={memoizedTabs}
      />
      <FlatList
        ref={pageRef}
        data={_secondCategories}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={memoizedPage}
        bounces={false}
        // onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialNumToRender={1}
        getItemLayout={(data, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
    </View>
  );
};

export default StoreDisplayScreen;
