import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import StackNavigation from './navigation/StackNavigation';

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
      if (loading) {
        setLoading(false);
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
