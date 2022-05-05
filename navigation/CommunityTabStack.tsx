import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CommunityLobby from '../src/screens/Community/CommunityLobby';
import PlaceLobby from '../src/screens/Place/PlaceLobby/PlaceLobby';
import LoginScreen from '../src/screens/Account/LoginScreen/LoginScreen';
import RegisterScreen from '../src/screens/Account/RegisterScreen/RegisterScreen';
import PwResetScreen from '../src/screens/Account/PwResetScreen/PwResetScreen';
import ProfileScreen from '../src/screens/Account/ProfileScreen/ProfileScreen';
import StoreDisplayScreen from '../src/screens/Place/StoreDisplayScreen/StoreDisplayScreen';
import StoreDetailScreen from '../src/screens/Place/StoreDetailScreen/StoreDetailScreen';
import ServiceDisplayScreen from '../src/screens/Place/ServiceDisplayScreen/ServiceDisplayScreen';
import ServiceDetailScreen from '../src/screens/Place/ServiceDetailScreen/ServiceDetailScreen';
import CurationDisplayScreen from '../src/screens/Place/CurationDisplayScreen/CurationDisplayScreen';

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
        name="CommunityLobby"
        component={CommunityLobby}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="PlaceLobby"
        component={PlaceLobby}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="Login"
        component={LoginScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="PwReset"
        component={PwResetScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="StoreDisplay"
        component={StoreDisplayScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="ServiceDisplay"
        component={ServiceDisplayScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{}}
      />
      <CommunityTabStack.Screen
        name="CurationDisplay"
        component={CurationDisplayScreen}
        options={{}}
      />
    </CommunityTabStack.Navigator>
  );
}
