import React, {useRef, useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import GridWrapper from './GridWrapper';
import {useGlobalContext} from '../../../Contexts/placeContext.';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';

const deviceWidth = Dimensions.get('window').width;

type StoreDisplayScreenNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;
type StoreDisplayScreenRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

const CategoryScreen = props => {
  const {stores, getStores} = useGlobalContext();

  const route = useRoute<StoreDisplayScreenRouteProp>();
  const navigation = useNavigation<StoreDisplayScreenNavigationProp>();

  // const mainDataSet = props.route.params.mainDataSet;
  const mainDataSet = stores;
  const currentLocation = props.route.params.location;

  const [initialIndex, setInitialIndex] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pageRef = useRef();
  const tabsRef = useRef();

  const this1stCategoryId = route.params.firstCategoryId;
  const this2ndCategoryPack = route.params.secondCategories;
  const initialSelectId = route.params.secondCategoryId;

  useEffect(() => {
    this2ndCategoryPack.forEach((element, index) => {
      if (element.id === initialSelectId) {
        setInitialIndex(index);
      }
    });
  });

  useEffect(() => {
    getStores(this1stCategoryId);
  }, []);

  let localFilter;
  if (currentLocation === '전체') {
    localFilter = mainDataSet;
  } else {
    localFilter = mainDataSet.filter(
      item => item.eupmyeondongRi === currentLocation,
    );
  }

  const groupBy = function (data, key) {
    return data.reduce(function (storage, item) {
      const group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };

  const orderData = (data, key) => {
    const container = [{category: '전체', data: localFilter}];
    const preData = groupBy(data, key);
    const getData = Object.entries(preData);

    getData.forEach(element => {
      container.push({
        category: element[0],
        data: element[1],
      });
    });
    return container;
  };

  const dataSet = orderData(localFilter, 'secondCategory');

  const initialSelect = props.route.params.selectedCategory;

  dataSet.forEach((element, index) => {
    if (element.category === initialSelect) {
      initialIndex.push(index);
    }
  });

  // 이벤트 해들러
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderPage = ({item, index}) => {
    const filteredData = stores.filter(
      data => data.secondCategoryId[0] == item.id,
    );
    return (
      <View style={styles.page}>
        <GridWrapper
          data={item.id == 'all' ? stores : filteredData}
          navigation={props.navigation}
          firstCategory={this1stCategoryId}
          route={props.route}></GridWrapper>
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

export default CategoryScreen;

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
    borderBottomColor: 'black',
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
