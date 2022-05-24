import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
  ActivityIndicator,
  Platform,
  Modal,
  Pressable,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';

type PlaceNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type PlaceDetailRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type Props = {};

const StoreDetailScreen = (props: Props) => {
  const route = useRoute<PlaceDetailRouteProp>();
  const navigation = useNavigation<PlaceNavigationProp>();
  console.log(route.params.data);

  return (
    <View>
      <Text>StoreDetailScreen</Text>
    </View>
  );
};

export default StoreDetailScreen;
