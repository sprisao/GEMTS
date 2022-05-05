import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Logo} from '../../../../constants/Assets';

const HeaderContainer = styled.View`
  display: flex;
  justify-content: center;
  border-bottom: solid, 1px;
`;

export default function PlaceLobbyHeader() {
  return (
    <HeaderContainer
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
    </HeaderContainer>
  );
}
