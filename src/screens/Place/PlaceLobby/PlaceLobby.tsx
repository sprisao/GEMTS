import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import React from 'react';

import {ThemeProvider} from 'styled-components';
import styled from 'styled-components/native';
import Theme from '../../../styles/Theme';

import {FirstCategoryEmojis} from '../../../constants/Assets';

import PlaceLobbyHeader from './components/PlaceLobbyHeader';
import {ButtonLarge} from './components/PlaceLobbyButtons';

const ContentScreen = styled.ScrollView`
  flex: 1;
`;

interface Props {}
const PlaceLobby = ({}: Props) => {
  return (
    <ThemeProvider theme={Theme}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <PlaceLobbyHeader />
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
                id={'restaurant'}
                emoji={FirstCategoryEmojis.restaurant}
              />
              <ButtonLarge
                name={'카페'}
                message={'원주의\n모든 카페를 한 눈에!'}
                id={'cafe'}
                emoji={FirstCategoryEmojis.cafe}
              />
            </View>
          </ContentScreen>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default PlaceLobby;
