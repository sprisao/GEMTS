import {View, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../navigation/PlaceTabStackParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type profileScreenProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'Profile'
>;

const ProfileScreen = ({}: Props) => {
  const navigation = useNavigation<profileScreenProp>();

  const handleLogout = async () => {
    try {
      await auth()
        .signOut()
        .then(() => navigation.navigate('Home'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button onPress={() => handleLogout()} title="로그아웃" />
    </View>
  );
};

export default ProfileScreen;
