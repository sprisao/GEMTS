import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PlaceTabStackParamList} from '../../../../../navigation/PlaceTabStackParams';
import {useNavigation} from '@react-navigation/native';

import {
  ButtonLargeContainer,
  ButtonLargeTop,
  ButtonLargeTopWrapper,
  ButtonLargeActivityDisplay,
  ButtonLargeBottom,
  ButtonLargeDescription,
  ButtonLargeName,
  ButtonMediumLeft,
  ButtonMediumContainer,
  ButtonMediumDescription,
  ButtonMediumName,
  ButtonMediumRight,
} from '../../../../styles/PlaceLobbyStyles';

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
    <ButtonLargeContainer
      onPress={() =>
        navigation.navigate('PlaceSecondLobby', {
          firstCategoryId: id,
        })
      }>
      <ButtonLargeTop>
        <ButtonLargeTopWrapper>
          <FastImage
            style={{width: '100%', height: '100%', overflow: 'visible'}}
            source={emoji}
          />
        </ButtonLargeTopWrapper>
        <ButtonLargeActivityDisplay>
          <Text>프로필</Text>
        </ButtonLargeActivityDisplay>
      </ButtonLargeTop>
      <ButtonLargeBottom>
        <ButtonLargeDescription style={{textAlign: 'right'}}>
          {message}
        </ButtonLargeDescription>
        <ButtonLargeName
          style={{
            textAlign: 'right',
            fontSize: 28,
            fontWeight: 'bold',
          }}>
          {name}
        </ButtonLargeName>
      </ButtonLargeBottom>
    </ButtonLargeContainer>
  );
}

export function ButtonMedium({id, name, message, emoji}: CategoryButtonProps) {
  const navigation = useNavigation<LobbyButtonProp>();
  return (
    <ButtonMediumContainer
      onPress={() => {
        if (id == 'curation') {
          navigation.navigate('CurationLobby');
        } else {
          navigation.navigate('ServiceLobby');
        }
      }}>
      <ButtonMediumLeft>
        <ButtonMediumDescription>{message}</ButtonMediumDescription>
        <ButtonMediumName>{name}</ButtonMediumName>
      </ButtonMediumLeft>
      <ButtonMediumRight>
        <FastImage
          style={{width: '100%', height: '100%', overflow: 'visible'}}
          source={emoji}
        />
      </ButtonMediumRight>
    </ButtonMediumContainer>
  );
}

export function ButtonSmall({id, name, emoji}: CategoryButtonProps) {
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
        flexDirection: 'column',
        padding: 8,
        backgroundColor: '#f8f8f8',
        borderWidth: 0.7,
        borderColor: '#dfdfdf',
        width: '23.5%',
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          position: 'relative',
          width: 40,
          height: 38,
          bottom: -10,
          right: -40,
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
