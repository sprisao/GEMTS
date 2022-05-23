import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  RefreshControl,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import DoubleTab from '../../../utils/DoubleTab';
import FastImage from 'react-native-fast-image';

import {useGlobalContext} from '../../../Contexts/placeContext.';

interface props {}

const deviceWidth = Dimensions.get('window').width;

type StoreDisplayScreenNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;
type StoreDisplayScreenRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

const StoreRender = ({}: props) => {
  const route = useRoute<StoreDisplayScreenRouteProp>();
  const navigation = useNavigation<StoreDisplayScreenNavigationProp>();
  // const mainDataSet = props.route.params.mainDataSet;
  // const currentLocation = props.route.params.location;

  const this1stCategoryId = route.params.firstCategoryId;
  const this2ndCategoryPack = route.params.secondCategories;
  const initialSelectId = route.params.secondCategoryId;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initialIndex, setInitialIndex] = useState();

  const pageRef = useRef();
  const tabsRef = useRef();

  // SecondLobby 에서 클릭한 카테고리 페이지 먼저 보여주도록
  useEffect(() => {
    this2ndCategoryPack.forEach((element, index) => {
      if (element.id === initialSelectId) {
        setInitialIndex(index);
      }
    });
  });

  let onEndReachedCalledDuringMomentum = false;

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const {getStores, stores, getMore} = useGlobalContext();

  useEffect(() => {
    getStores(this1stCategoryId);
  }, []);

  const onRefresh = () => {
    setTimeout(() => {
      getStores();
    }, 1000);
  };
  const renderFooter = () => {
    if (!isMoreLoading) return true;

    return (
      <ActivityIndicator
        size="large"
        color={'#D83E64'}
        style={{marginBottom: 10}}
      />
    );
  };

  // 이벤트 핸들러
  const onTabPress = e => {
    pageRef.current.scrollToIndex({
      animated: true,
      index: e,
      viewPosition: 0,
    });
  };

  const onSwipe = e => {
    const offset = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(offset / deviceWidth);
    const selectedIndex = Platform.OS === 'ios' ? pageIndex : pageIndex;

    setSelectedIndex(selectedIndex);

    if (offset > 0) {
      tabsRef.current.scrollToIndex({
        animated: true,
        index: selectedIndex,
        viewPosition: 0.5,
      });
    }
  };

  // 탭 렌더링
  const renderTabs = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.tab]} onPress={() => onTabPress(index)}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.tabText,
              {
                opacity: index === selectedIndex ? 1 : 0.75,
                color: index === selectedIndex ? 'red' : 'white',
              },
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // stores.map(item => console.log(item.secondCategoryId[0]));

  // 각 2차카테고리별 페이지 렌더링
  const renderPage = ({item, index}) => {
    const filteredData = stores.filter(
      data => data.secondCategoryId[0] == item.id,
    );
    return (
      <View style={styles.page}>
        <FlatList
          data={item.id == 'all' ? stores : filteredData}
          windowSize={2}
          disableVirtualization={false}
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
              getMore(this1stCategoryId);
            }
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
            paddingHorizontal: 8,
          }}
          initialNumToRender={20}
          maxToRenderPerBatch={30}
          ListFooterComponent={renderFooter}
          renderItem={({item}) => (
            <>
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
            </>
          )}
        />
      </View>
    );
  };

  const memoizedPage = useMemo(() => renderPage, [renderPage]);
  const memoizedTabs = useMemo(() => renderTabs, [renderTabs]);

  return (
    <View style={styles.screen}>
      <View style={styles.tabsContainer}>
        <FlatList
          ref={tabsRef}
          data={this2ndCategoryPack}
          keyExtractor={item => item.id}
          renderItem={memoizedTabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
        />
      </View>

      <FlatList
        ref={pageRef}
        data={this2ndCategoryPack}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={memoizedPage}
        bounces={false}
        onScroll={onSwipe}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={initialIndex}
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

export default StoreRender;

const styles = StyleSheet.create({
  screen: {flex: 1},
  page: {width: deviceWidth},
  tabsContainer: {height: 'auto', width: '100%', backgroundColor: 'blue'},
  tab: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 7,
  },
  textContainer: {
    width: 'auto',
    height: 'auto',
    borderBottomColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
    letterSpacing: -0.25,
    fontSize: 13,
  },
});
