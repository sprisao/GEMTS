import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PlaceTabStackParamList} from '../../../../../navigation/PlaceTabStackParams';
import {useNavigation} from '@react-navigation/native';

type LobbyButtonProp = NativeStackNavigationProp<PlaceTabStackParamList>;

type CategoryButtonProps = {
  id: string;
  name: string;
  message: string;
  emoji: string;
};

export function ButtonLarge({id, name, message, emoji}: CategoryButtonProps) {
  const navigation = useNavigation<LobbyButtonProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlaceSecondLobby', {
          firstCategoryId: id,
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
        <View style={{width: '50%', padding: 5}}>
          <FastImage
            style={{width: '100%', height: '100%', overflow: 'visible'}}
            source={emoji}
          />
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

export function ButtonMedium({id, name, message, emoji}: CategoryButtonProps) {
  const navigation = useNavigation<LobbyButtonProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlaceSecondLobby', {
          firstCategoryId: id,
        })
      }
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'grey',
        width: '49%',
        height: 85,
        borderRadius: 8,
        overflow: 'hidden',
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <Text style={{textAlign: 'left', fontSize: 11}}>{message}</Text>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          position: 'relative',
          width: '35%',
          bottom: -10,
          right: -25,
          overflow: 'visible',
        }}>
        <FastImage
          style={{width: '100%', height: '100%', overflow: 'visible'}}
          source={emoji}
        />
      </View>
    </TouchableOpacity>
  );
}
