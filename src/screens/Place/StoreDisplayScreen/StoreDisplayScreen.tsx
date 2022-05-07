import React from 'react';
import {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';

type StoreDisplayScreenNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type StoreDisplayScreenRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type Props = {};

const StoreDisplayScreen = (props: Props) => {
  const [stores, setStores] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Users = firestore()
      .collection('stores')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
          });
          setSubscribers(users);
          setLoading(false);
        });
      });
    return () => Users();
  }, []);

  console.log('subs', subscribers);

  const route = useRoute<StoreDisplayScreenRouteProp>();
  const navigation = useNavigation<StoreDisplayScreenNavigationProp>();

  const _firstCategoryId = route.params.firstCategoryId;
  const _initialFocus = route.params.initialFocus;

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <FlatList
        data={subscribers}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default StoreDisplayScreen;
