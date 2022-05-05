import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {useNavigation} from '@react-navigation/native';

import {ThemeProvider} from 'styled-components';
import styled, {DefaultTheme} from 'styled-components/native';
import Theme from '../../../styles/Theme';

import FastImage from 'react-native-fast-image';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {Logo, FirstCategoryEmojis} from '../../../constants/Assets';

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

const ContentScreen = styled.ScrollView`
  flex: 1;
`;

const PlaceLobbyHeader = styled.View`
  display: flex;
  justify-content: center;
  border-bottom: solid, 1px;
`;

type CategoryButtonProps = {
  firstCategoryId: string;
  name: string;
  message: string;
  emoji: string;
  navigation: placeLobbyProp;
};

function ButtonLarge({
  firstCategoryId,
  name,
  message,
  emoji,
  navigation,
}: CategoryButtonProps) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlaceSecondLobby', {
          firstCategoryId: firstCategoryId,
        })
      }
      style={{
        flexDirection: 'column',
        padding: 8,
        backgroundColor: 'grey',
        width: '49%',
        height: 185,
        borderRadius: 8,
      }}>
      <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <FastImage style={{width: '100%', height: '100%'}} source={emoji} />
        </View>
        <View>
          <Text>프로필</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text style={{textAlign: 'right'}}>{message}</Text>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type placeLobbyProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'PlaceLobby'
>;

interface Props {}
const PlaceLobby = ({}: Props) => {
  const navigation = useNavigation<placeLobbyProp>();

  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <PlaceLobbyHeader
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 5,
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
                    source={Logo.color}
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
          <ContentScreen>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 3,
                paddingTop: 15,
              }}>
              <ButtonLarge
                name={'맛집'}
                message={'검색없이 한번에\n바로찾는 원주맛집'}
                firstCategoryId={'restaurant'}
                emoji={FirstCategoryEmojis.restaurant}
                navigation={navigation}
              />
              <ButtonLarge
                name={'카페'}
                message={'원주의\n모든 카페를 한 눈에!'}
                firstCategoryId={'cafe'}
                emoji={FirstCategoryEmojis.cafe}
                navigation={navigation}
              />
            </View>
          </ContentScreen>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default PlaceLobby;
