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
  //   Profile: {userId: string};
  //   Feed: {sort: 'latest' | 'top'} | undefined;
};

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{}} />
      <HomeStack.Screen name="Login" component={LoginScreen} options={{}} />
      <HomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{}}
      />
      <HomeStack.Screen name="PwReset" component={PwResetScreen} options={{}} />
      <HomeStack.Screen
        name="StoreDisplay"
        component={StoreDisplayScreen}
        options={{}}
      />
      <HomeStack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{}}
      />
      <HomeStack.Screen
        name="ServiceDisplay"
        component={ServiceDisplayScreen}
        options={{}}
      />
      <HomeStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{}}
      />
      <HomeStack.Screen name="Profile" component={ProfileScreen} options={{}} />
      <HomeStack.Screen
        name="CurationDisplay"
        component={CurationDisplayScreen}
        options={{}}
      />
    </HomeStack.Navigator>
  );
}
