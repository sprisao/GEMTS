import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../src/screens/HomeScreen/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen/RegisterScreen';
import PwResetScreen from '../src/screens/PwResetScreen/PwResetScreen';
import ProfileScreen from '../src/screens/ProfileScreen/ProfileScreen';
import StoreDisplayScreen from '../src/screens/StoreDisplayScreen/StoreDisplayScreen';
import StoreDetailScreen from '../src/screens/StoreDetailScreen/StoreDetailScreen';
import ServiceDisplayScreen from '../src/screens/ServiceDisplayScreen/ServiceDisplayScreen';
import ServiceDetailScreen from '../src/screens/ServiceDetailScreen/ServiceDetailScreen';
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
