import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatLobby from '../src/screens/Chat/ChatLobby';

type RootStackParamList = {
  ChatLobby: undefined;
  Home: undefined;
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

const ChatTabStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <ChatTabStack.Navigator
      initialRouteName="ChatLobby"
      screenOptions={{contentStyle: {backgroundColor: '#FFFFFF'}}}>
      <ChatTabStack.Screen
        name="ChatLobby"
        component={ChatLobby}
        options={{}}
      />
    </ChatTabStack.Navigator>
  );
}
