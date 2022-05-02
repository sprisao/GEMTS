import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/Place/HomeScreen/HomeScreen';
import LoginScreen from '../src/screens/Account/LoginScreen/LoginScreen';
import RegisterScreen from '../src/screens/Account/RegisterScreen/RegisterScreen';
import PwResetScreen from '../src/screens/Account/PwResetScreen/PwResetScreen';
import ProfileScreen from '../src/screens/Account/ProfileScreen/ProfileScreen';
import StoreDisplayScreen from '../src/screens/Place/StoreDisplayScreen/StoreDisplayScreen';
import StoreDetailScreen from '../src/screens/Place/StoreDetailScreen/StoreDetailScreen';
import ServiceDisplayScreen from '../src/screens/Place/ServiceDisplayScreen/ServiceDisplayScreen';
import ServiceDetailScreen from '../src/screens/Place/ServiceDetailScreen/ServiceDetailScreen';
import CurationDisplayScreen from '../src/screens/CurationDisplayScreen/CurationDisplayScreen';

type RootStackParamList = {
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

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Home" component={HomeScreen} options={{}} />
      <ProfileStack.Screen name="Login" component={LoginScreen} options={{}} />
      <ProfileStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="PwReset"
        component={PwResetScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="StoreDisplay"
        component={StoreDisplayScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="ServiceDisplay"
        component={ServiceDisplayScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{}}
      />
      <ProfileStack.Screen
        name="CurationDisplay"
        component={CurationDisplayScreen}
        options={{}}
      />
    </ProfileStack.Navigator>
  );
}
