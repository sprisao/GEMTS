import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '../src/screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../src/screens/LoginScreen/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen/RegisterScreen';
import PwResetScreen from '../src/screens/PwResetScreen/PwResetScreen';

type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  PwReset: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

export default function StackNavigation() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{}}
      />
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
    </ProfileStack.Navigator>
  );
}
