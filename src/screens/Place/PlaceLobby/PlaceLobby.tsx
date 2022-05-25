import React from 'react';

import styled from 'styled-components/native';

import {FirstCategoryEmojis} from '../../../constants/Assets';

import PlaceLobbyHeader from './components/PlaceLobbyHeader';
import {
  ButtonLarge,
  ButtonMedium,
  ButtonSmall,
} from './components/PlaceLobbyButtons';

import Banner from './components/Banner';
import {
  SafeAreaView,
  ScrollView,
  ButtonsWrapper,
} from '../../../styles/PlaceLobbyStyles';

interface Props {}

const PlaceLobby = ({}: Props) => {
  return (
    <SafeAreaView>
      <PlaceLobbyHeader />
      <ScrollView>
        <ButtonsWrapper>
          <ButtonLarge
            name={'맛집'}
            message={'검색없이 한번에\n바로찾는 원주맛집'}
            id={'recxEYsUuSaVk3ge2'}
            emoji={FirstCategoryEmojis.restaurant}
          />
          <ButtonLarge
            name={'카페'}
            message={'원주의\n모든 카페를 한 눈에!'}
            id={'rec1nohULLWQVqXZD'}
            emoji={FirstCategoryEmojis.cafe}
          />
        </ButtonsWrapper>
        <ButtonsWrapper>
          <ButtonMedium
            name={'젬 클래스'}
            id={'service'}
            message={'우리동네 재능마켓\n다양한 클래스'}
            emoji={FirstCategoryEmojis.class}
          />
          <ButtonMedium
            name={'젬 큐레이션'}
            id={'curation'}
            message={'젬이 소개하는\n보석같은 장소들'}
            emoji={FirstCategoryEmojis.curation}
          />
        </ButtonsWrapper>
        <ButtonsWrapper>
          <Banner />
        </ButtonsWrapper>
        <ButtonsWrapper>
          <ButtonSmall
            id="rectbHPCk3LZzfu6w"
            name="호프주점"
            emoji={FirstCategoryEmojis.pub}
            message={''}
          />
          <ButtonSmall
            id="recTQQfv194uE5O1K"
            name="운동헬스"
            emoji={FirstCategoryEmojis.gym}
            message={''}
          />
          <ButtonSmall
            id="recse3cQXji2BWlNu"
            name="미용뷰티"
            emoji={FirstCategoryEmojis.beauty}
            message={''}
          />
          <ButtonSmall
            id="recqOzD4oznYyHeXS"
            name="사진"
            emoji={FirstCategoryEmojis.studio}
            message={''}
          />
        </ButtonsWrapper>
        <ButtonsWrapper>
          <ButtonSmall
            id="rec9dQcEElsgcAsD7"
            name="반려동물"
            emoji={FirstCategoryEmojis.pets}
            message={''}
          />
          <ButtonSmall
            id="recoF9HKKfA3ZSxSP"
            name="꽃"
            emoji={FirstCategoryEmojis.flowershop}
            message={''}
          />
          <ButtonSmall
            id="recXj7vVqBBJttGd8"
            name="키즈"
            emoji={FirstCategoryEmojis.kids}
            message={''}
          />
          <ButtonSmall
            id="recz1ftDhPT8VADjf"
            name="교육학원"
            emoji={FirstCategoryEmojis.education}
            message={''}
          />
        </ButtonsWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceLobby;
