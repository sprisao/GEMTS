import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CommunityLobby from '../src/screens/Community/CommunityLobby';

type RootStackParamList = {
  CommunityLobby: undefined;
  PlaceLobby: undefined;
  Login: undefined;
  Register: undefined;
  PwReset: undefined;
  Profile: undefined;
  CurationDisplay: undefined;
  StoreDisplay: undefined;
  StoreDetail: undefined;
  ServiceDisplay: undefined;
  ServiceDetail: undefined;
};

const CommunityTabStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <CommunityTabStack.Navigator
      initialRouteName="CommunityLobby"
      screenOptions={{contentStyle: {backgroundColor: '#FFFFFF'}}}>
      <CommunityTabStack.Screen
        name="이벤트&할인"
        component={CommunityLobby}
        options={{}}
      />
    </CommunityTabStack.Navigator>
  );
}
