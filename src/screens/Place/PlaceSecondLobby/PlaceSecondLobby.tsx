import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';

import {StoreSecondCat} from '../../../../data/StoreSecondCat';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGlobalContext} from '../../../contexts/placeContext.';

import {
  MainScreen,
  SecondCategoriesGrid,
  SecondCategoriesWrapper,
  SecondCategoryButton,
  SecondCategoryButtonEmoji,
  SecondCategoryButtonName,
  SecondCategoryButtonWrapper,
} from '../../../styles/PlaceSecondLobbyStyles';

type placeSecondLobbyNavigationProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

type placeSecondLobbyRouteProp = RouteProp<
  PlaceTabStackParamList,
  'PlaceSecondLobby'
>;

interface Props {}

const PlaceSecondLobby = ({}: Props) => {
  const route = useRoute<placeSecondLobbyRouteProp>();
  const navigation = useNavigation<placeSecondLobbyNavigationProp>();

  const allSecondCategory = StoreSecondCat;
  const _firstCategoryId = route.params.firstCategoryId;
  const {getStores, stores} = useGlobalContext();

  useEffect(() => {
    getStores(_firstCategoryId);
  }, []);
  const thisSecondCategories = allSecondCategory.filter(
    item => item.firstCategoryId === _firstCategoryId,
  );

  const _renderItem = ({item}) => {
    return (
      <SecondCategoryButton
        onPress={() =>
          navigation.navigate('StoreDisplay', {
            firstCategoryId: item.firstCategoryId,
            initialFocus: item.id,
            secondCategoryId: item.id,
            secondCategories: thisSecondCategories,
          })
        }>
        <SecondCategoryButtonWrapper>
          <SecondCategoryButtonEmoji>{item.emoji}</SecondCategoryButtonEmoji>
          <SecondCategoryButtonName>{item.title}</SecondCategoryButtonName>
        </SecondCategoryButtonWrapper>
      </SecondCategoryButton>
    );
  };

  return (
    <MainScreen>
      <SecondCategoriesWrapper>
        <SecondCategoriesGrid
          data={thisSecondCategories}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          numColumns={2}
        />
      </SecondCategoriesWrapper>
    </MainScreen>
  );
};

export default PlaceSecondLobby;
