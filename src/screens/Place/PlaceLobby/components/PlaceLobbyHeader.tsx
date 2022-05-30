import React from 'react';
import {View, Text, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Logo} from '../../../../constants/Assets';

export default function PlaceLobbyHeader() {
  return (
    <View
      style={{
        position: 'absolute',
        ...Platform.select({
          ios: {paddingTop: 50},
          android: {paddingTop: 5},
        }),
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'purple',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 2,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
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
                color: 'white',
              }}>
              강원도 원주시 {'>'}
            </Text>
          </View>
        </View>
        <View>
          <IonIcons name="notifications-outline" size={25} color={'white'} />
        </View>
      </View>
    </View>
  );
}
