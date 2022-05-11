import * as React from 'react';
import {useState, useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import LoginScreen from '../src/screens/Account/LoginScreen/LoginScreen';
import RegisterScreen from '../src/screens/Account/RegisterScreen/RegisterScreen';
import PwResetScreen from '../src/screens/Account/PwResetScreen/PwResetScreen';
import ProfileScreen from '../src/screens/Account/ProfileScreen/ProfileScreen';
import StoreDetailScreen from '../src/screens/Place/StoreDetailScreen/StoreDetailScreen';
import ServiceDetailScreen from '../src/screens/Place/ServiceDetailScreen/ServiceDetailScreen';

type RootStackParamList = {
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

const AccountTabStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const [user, setUser] = useState();
  function onAuthStateChanged() {
    const thisUser = auth().currentUser;
    setUser(thisUser);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AccountTabStack.Navigator
      screenOptions={{contentStyle: {backgroundColor: '#FFFFFF'}}}>
      {user == null ? (
        <>
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
        </>
      ) : (
        <>
          <AccountTabStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{}}
          />
          <AccountTabStack.Screen
            name="StoreDetail"
            component={StoreDetailScreen}
            options={{}}
          />
          <AccountTabStack.Screen
            name="ServiceDetail"
            component={ServiceDetailScreen}
            options={{}}
          />
        </>
      )}
    </AccountTabStack.Navigator>
  );
}
