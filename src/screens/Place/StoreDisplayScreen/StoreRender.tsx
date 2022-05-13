import React, {useMemo, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';

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

  const this1stCategoryId = route.params.firstCategoryId;
  const this2ndCategoryId = route.params.secondCategoryId;
  const this2ndCategoryPackage = route.params.secondCategories;
  const this2endCatIds = this2ndCategoryPackage.map(item => item.id);
  const focusedIndex = this2endCatIds.indexOf(this2ndCategoryId);

  const [currentFocus, setCurrentFocus] = useState(focusedIndex);

  function onCategorySelect(id, index) {
    setCurrentFocus(index);
  }

  const tabButton = ({item, index}) => (
    <TouchableOpacity
      onPress={() => onCategorySelect(item.id, index)}
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

  function CategoryPage(props: {item: any; index: any}) {
    let {item, index} = props;
    return (
      <View style={{width: deviceWidth, height: 300, backgroundColor: 'pink'}}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  const memoizedTabs = useMemo(() => tabButton, [tabButton]);
  const memoizedPages = useMemo(() => CategoryPage, [CategoryPage]);

  return (
    <View>
      <FlatList
        style={{backgroundColor: 'blue', height: 50, marginBottom: 8}}
        horizontal
        data={this2ndCategoryPackage}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 75,
          offset: 75 * (index + 1),
          index,
        })}
        renderItem={memoizedTabs}></FlatList>
      <FlatList
        data={this2ndCategoryPackage}
        renderItem={memoizedPages}
        keyExtractor={item => {
          return item.id;
        }}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        initialScrollIndex={focusedIndex}
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
