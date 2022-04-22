import {Button} from 'react-native';
import React from 'react';
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
  const navigation = useNavigation<homeScreenProp>();
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <MainText>HomeScreen</MainText>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen;
