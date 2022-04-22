import {View, Text, Button} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (auth().currentUser) {
      setUser(auth().currentUser);
    }
  }, [user]);

  console.log(user);
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View>
      <Text>LoginScreen</Text>
      {user ? (
        <Button title="로그아웃" />
      ) : (
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() => console.log('구글로그인'))
          }
        />
      )}
    </View>
  );
};

export default LoginScreen;
