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
  //   Profile: {userId: string};
  //   Feed: {sort: 'latest' | 'top'} | undefined;
};

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const PlaceTabStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <PlaceTabStack.Navigator initialRouteName="Home">
      <PlaceTabStack.Screen name="Home" component={HomeScreen} options={{}} />
      <PlaceTabStack.Screen name="Login" component={LoginScreen} options={{}} />
      <PlaceTabStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="PwReset"
        component={PwResetScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="StoreDisplay"
        component={StoreDisplayScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="ServiceDisplay"
        component={ServiceDisplayScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{}}
      />
      <PlaceTabStack.Screen
        name="CurationDisplay"
        component={CurationDisplayScreen}
        options={{}}
      />
    </PlaceTabStack.Navigator>
  );
}
