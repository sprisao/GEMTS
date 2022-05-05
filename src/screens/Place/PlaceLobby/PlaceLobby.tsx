import React from 'react';

import {ThemeProvider} from 'styled-components';
import styled from 'styled-components/native';
import Theme from '../../../styles/Theme';

import {FirstCategoryEmojis} from '../../../constants/Assets';

import PlaceLobbyHeader from './components/PlaceLobbyHeader';
import {ButtonLarge} from './components/PlaceLobbyButtons';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const ButtonWrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 3px;
  padding-top: 15px;
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
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default PlaceLobby;
