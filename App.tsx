import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import StackNavigation from './navigation/StackNavigation';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const googleSignin = () => {
    GoogleSignin.configure({
      webClientId:
        '592721340078-98ogm20c8hhr2tkev4ppjj6agk3lcahj.apps.googleusercontent.co',
    });
  };

  useEffect(() => {
    googleSignin();
  });

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default App;
