import {Button, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/RootStackParams';
import {useNavigation} from '@react-navigation/native';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
