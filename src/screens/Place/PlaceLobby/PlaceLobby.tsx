import React from 'react';

import {ThemeProvider} from 'styled-components';
import styled from 'styled-components/native';
import Theme from '../../../styles/Theme';

import {FirstCategoryEmojis} from '../../../constants/Assets';

import PlaceLobbyHeader from './components/PlaceLobbyHeader';
import {ButtonLarge, ButtonMedium} from './components/PlaceLobbyButtons';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 15px;
`;

const ButtonWrapper = styled.View`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

interface Props {}
const PlaceLobby = ({}: Props) => {
  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaView>
        <PlaceLobbyHeader />
        <ScrollView>
          <ButtonWrapper>
            <ButtonLarge
              name={'맛집'}
              message={'검색없이 한번에\n바로찾는 원주맛집'}
              id={'restaurant'}
              emoji={FirstCategoryEmojis.restaurant}
            />
            <ButtonLarge
              name={'카페'}
              message={'원주의\n모든 카페를 한 눈에!'}
              id={'cafe'}
              emoji={FirstCategoryEmojis.cafe}
            />
          </ButtonWrapper>
          <ButtonWrapper>
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
          </ButtonWrapper>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default PlaceLobby;
