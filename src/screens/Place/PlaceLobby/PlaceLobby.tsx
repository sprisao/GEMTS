import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation} from '@react-navigation/native';

import {ThemeProvider} from 'styled-components';
import styled, {DefaultTheme} from 'styled-components/native';
import Theme from '../../../styles/Theme';
import FastImage from 'react-native-fast-image';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

interface StyledProps {
  theme: DefaultTheme;
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyledProps) =>
    props.theme && props.theme.colors.deactive};
`;

const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: white;
`;

const ScrollScreen = styled.ScrollView`
  display: flex;
`;

const PlaceLobbyHeader = styled.View`
  display: flex;
  justify-content: center;
  border-bottom: solid, 1px;
`;

type homeScreenProp = NativeStackNavigationProp<PlaceTabStackParamList, 'Home'>;

interface Props {}
const HomeScreen = ({}: Props) => {
  const navigation = useNavigation<homeScreenProp>();
  // const subscriber = auth().currentUser;

  const FirstCategoryData = [
    {
      name: '맛집',
      desc: '검색없이 한번에 바로찾는 원주맛집',
      emoji: '../../../../assets/images/emojis/restaurants.png',
    },
    {
      name: '카페',
      desc: '원주의 \n 모든 카페를 한 눈에!',
      emoji: '../../../../assets/images/emojis/cafe.png',
    },
    {
      name: '젬 클래스',
      desc: '우리동네 재능마켓 \n 다양한 클래스 정보',
      emoji: '../../../../assets/images/emojis/gift.png',
    },
    {
      name: '젬 큐레이션',
      desc: '젬이 소개하는 \n 보석같은 장소들',
      emoji: '../../../../assets/images/emojis/curation.png',
    },
  ];

  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1, backgroundColor: '#f3f3f3'}}>
          <PlaceLobbyHeader
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 5,
              marginBottom: 15,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                padding: 17,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', height: '100%'}}>
                <View
                  style={{
                    width: 26,
                    height: 28,
                    marginLeft: 6,
                    marginRight: 16,
                  }}>
                  <FastImage
                    style={{width: '100%', height: '100%'}}
                    source={require('../../../../assets/images/BI/LogoGrey.png')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '100%',
                    // paddingTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    강원도 원주시 {'>'}
                  </Text>
                </View>
              </View>
              <View>
                <IonIcons name="notifications-outline" size={25} />
              </View>
            </View>
          </PlaceLobbyHeader>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default HomeScreen;
