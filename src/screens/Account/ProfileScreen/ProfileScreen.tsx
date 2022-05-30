import {ScrollView, Text, View, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styled from 'styled-components/native';

type profileScreenProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'Profile'
>;

interface Props {}

const PROFILE_IMAGE_CONTAINER = styled.View`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  overflow: hidden;
`;

const PROFILE_IMAGE = styled.Image`
  width: 100%;
  overflow: hidden;
  border-radius: 65px;
  height: 100%;
`;

const ProfileScreen = ({}: Props) => {
  const navigation = useNavigation<profileScreenProp>();

  const handleLogout = async () => {
    try {
      await auth()
        .signOut()
        .then(() => navigation.navigate('Home'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#d3d3d3',
          width: '100%',
          height: 150,
        }}>
        <PROFILE_IMAGE_CONTAINER>
          <PROFILE_IMAGE
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/gemnative-642d4.appspot.com/o/test_images%2F%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%86%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB_%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A7%E1%86%A8.jpeg?alt=media&token=79b8eb14-fee0-463c-80a9-80f0d118a820',
            }}
          />
        </PROFILE_IMAGE_CONTAINER>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'column',
            width: '50%',
          }}>
          <Text>@sprisao</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text>Follower</Text>
              <Text>120</Text>
            </View>
            <View>
              <Text>Following</Text>
              <Text>33</Text>
            </View>
          </View>
          <View>
            <Text>동네친구</Text>
            <Text>카테고리별 방문 :</Text>
          </View>
        </View>
      </View>
      <View>
        <View>
          <View>
            <Text>최근 방문한 곳</Text>
          </View>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text>・ 🧆 안432.. (일주일 전) </Text>
            <Text>・ 🥘 까치둥지.. (한달 전) </Text>
            <Text>・ ☕️ 코헨쇼룸.. (두달 전) </Text>
          </View>
        </View>
        <View>
          <View>
            <Text>Reviews</Text>
          </View>
          <View style={{height: 50, backgroundColor: 'yellow'}}>
            <Text>리뷰 공감: </Text>
          </View>
        </View>
        <View>
          <View>
            <Text>참여 중인 커뮤니티</Text>
          </View>
          <View style={{height: 50, backgroundColor: 'yellow'}}></View>
        </View>
      </View>
      <Button onPress={() => handleLogout()} title="로그아웃" />
    </ScrollView>
  );
};

export default ProfileScreen;
