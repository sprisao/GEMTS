import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

import FastImage from 'react-native-fast-image';

import {PlaceTabStackParamList} from '../../../../../navigation/PlaceTabStackParams';

import {useNavigation} from '@react-navigation/native';

import {
  ButtonLargeActivityDisplay,
  ButtonLargeBottom,
  ButtonLargeContainer,
  ButtonLargeDescription,
  ButtonLargeName,
  ButtonLargeTop,
  ButtonLargeTopWrapper,
  ButtonMediumContainer,
  ButtonMediumDescription,
  ButtonMediumLeft,
  ButtonMediumName,
  ButtonMediumRight,
  ButtonSmallBottom,
  ButtonSmallContainer,
  ButtonSmallName,
  ButtonSmallTop,
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
        <ButtonLargeActivityDisplay />
      </ButtonLargeTop>
      <ButtonLargeBottom>
        <ButtonLargeDescription>{message}</ButtonLargeDescription>
        <ButtonLargeName>{name}</ButtonLargeName>
      </ButtonLargeBottom>
    </ButtonLargeContainer>
  );
}

export function ButtonMedium({id, name, message, emoji}: CategoryButtonProps) {
  const navigation = useNavigation<LobbyButtonProp>();
  return (
    <ButtonMediumContainer
      onPress={() => {
        if (id === 'curation') {
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
    <ButtonSmallContainer
      onPress={() =>
        navigation.navigate('PlaceSecondLobby', {
          firstCategoryId: id,
        })
      }>
      <ButtonSmallTop>
        <ButtonSmallName>{name}</ButtonSmallName>
      </ButtonSmallTop>
      <ButtonSmallBottom>
        <FastImage
          style={{width: '100%', height: '100%', overflow: 'visible'}}
          source={emoji}
        />
      </ButtonSmallBottom>
    </ButtonSmallContainer>
  );
}
