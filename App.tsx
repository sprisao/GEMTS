import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {useEffect, useState} from 'react';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import StackNavigation from './navigation/StackNavigation';

// import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  // const [initializing, setInitializing] = useState<boolean>(true);
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // const googleSignin = () => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '592721340078-98ogm20c8hhr2tkev4ppjj6agk3lcahj.apps.googleusercontent.co',
  //   });
  // };

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }

  // useEffect(() => {
  //   googleSignin();
  // });

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default App;
