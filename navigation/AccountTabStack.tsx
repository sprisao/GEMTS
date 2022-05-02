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
import CurationDisplayScreen from '../src/screens/Place/CurationDisplayScreen/CurationDisplayScreen';

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

const AccountTabStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <AccountTabStack.Navigator initialRouteName="Profile">
      <AccountTabStack.Screen name="Home" component={HomeScreen} options={{}} />
      <AccountTabStack.Screen
        name="Login"
        component={LoginScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="PwReset"
        component={PwResetScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="StoreDisplay"
        component={StoreDisplayScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="ServiceDisplay"
        component={ServiceDisplayScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{}}
      />
      <AccountTabStack.Screen
        name="CurationDisplay"
        component={CurationDisplayScreen}
        options={{}}
      />
    </AccountTabStack.Navigator>
  );
}
