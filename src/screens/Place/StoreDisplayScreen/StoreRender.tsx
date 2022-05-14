import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import Page from './Page';

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

  const this2ndCategoryPack = route.params.secondCategories;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [initialIndex, setInitialIndex] = useState();

  const pageRef = useRef();
  const tabsRef = useRef();

  // SecondLobby 에서 클릭한 카테고리 페이지 먼저 보여주도록
  useEffect(() => {
    const initialSelect = route.params.secondCategoryId;
    this2ndCategoryPack.forEach((element, index) => {
      if (element.id === initialSelect) {
        setInitialIndex(index);
      }
    });
  });

  // let localFilter;
  // if (currentLocation === '전체') {
  //   localFilter = mainDataSet;
  // } else {
  //   localFilter = mainDataSet.filter(
  //     item => item.eupmyeondongRi === currentLocation,
  //   );
  // }

  const groupBy = function (data, key) {
    return data.reduce(function (storage, item) {
      const group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };

  // const orderData = (data, key) => {
  //   const container = [{category: '전체', data: localFilter}];
  //   const preData = groupBy(data, key);
  //   const getData = Object.entries(preData);
  //
  //   getData.forEach(element => {
  //     container.push({
  //       category: element[0],
  //       data: element[1],
  //     });
  //   });
  //   return container;
  // };
  //
  // const dataSet = orderData(localFilter, 'secondCategory');

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

  // 각 2차카테고리별 페이지 렌더링
  const renderPage = ({item, index}) => {
    return (
      <View style={styles.page}>
        <Text>{item.title}</Text>
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
