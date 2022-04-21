import React from 'react';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SafeAreaView, Text} from 'react-native';

const App = () => {
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
    <SafeAreaView>
      <Text>Welcom JH</Text>
    </SafeAreaView>
  );
};
export default App;
