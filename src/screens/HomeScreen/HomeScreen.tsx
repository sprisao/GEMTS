import {ActivityIndicator, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/RootStackParams';
import {useNavigation} from '@react-navigation/native';

import {ThemeProvider} from 'styled-components';
import styled, {DefaultTheme} from 'styled-components/native';
import Theme from '../../styles/Theme';

interface StyledProps {
  theme: DefaultTheme;
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyledProps) =>
    props.theme && props.theme.colors.deactive};
`;
const MainText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: white;
`;

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {}
const HomeScreen = ({}: Props) => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState<boolean>(true);
  const navigation = useNavigation<homeScreenProp>();
  // const subscriber = auth().currentUser;

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  console.log('홈화면 사용자: ', user);
  if (initializing) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <MainText>HomeScreen</MainText>
        <Button
          title={!user ? 'Login' : 'Profile'}
          onPress={() => navigation.navigate(!user ? 'Login' : 'Profile')}
        />
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen;
