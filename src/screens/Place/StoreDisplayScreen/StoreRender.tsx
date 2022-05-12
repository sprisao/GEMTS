import React from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import FastImage from 'react-native-fast-image';

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

  // useStates는 왠만하면 이 아래에서 처리해야 할 듯
  // currentFocus는 id로 처리하고 스크롤은 index를 활용해야겠다.
  const [currentFocus, setCurrentFocus] = useState(this2ndCategoryId);

  function onCategorySelect(id, index) {
    setCurrentFocus(id);
  }

  function tabButton({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => onCategorySelect(item.id, index)}
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

  const memoizedTabs = useMemo(() => tabButton, [tabButton]);

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
    </View>
  );
};

export default StoreRender;
