import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';
import {PlaceTabStackParamList} from '../../../../navigation/PlaceTabStackParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type registerScreenProp = NativeStackNavigationProp<
  PlaceTabStackParamList,
  'Register'
>;

interface Props {}
const RegisterScreen = ({}: Props) => {
  const navigation = useNavigation<registerScreenProp>();

  const [initializing, setInitializing] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('second');

  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    console.log('버튼 누름');
    setLoading(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          firestore().collection('UsersTest').add({
            uid: userCredential.user.uid,
            email: email,
            registerPassword: password,
          });
          navigation.navigate('Home');
        });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  // 이메일
  const onChangeEmail = useCallback(e => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸습니다! 다시 확인해주세요 ㅠㅠ');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식입니다! : -) ');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback(e => {
    console.log('비밀번호 들어옴');
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e;
    setPassword(passwordCurrent);
    console.log(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호입니다 :  -)');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인

  const onChangePasswordConfirm = useCallback(
    e => {
      const passwordConfirmCurrent = e;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ');
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  function onAuthStateChanged() {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>RegisterScreen</Text>
          <View>
            <TextInput
              onChangeText={e => onChangeEmail(e)}
              placeholder="이메일"
            />
            {email.length > 0 && <Text>{emailMessage}</Text>}
          </View>
          <View>
            <TextInput
              onChangeText={e => onChangePassword(e)}
              placeholder="비밀번호"
              secureTextEntry={true}
            />
            {password.length > 0 && <Text>{passwordMessage}</Text>}
          </View>
          <View>
            <TextInput
              onChangeText={e => onChangePasswordConfirm(e)}
              secureTextEntry={true}
              placeholder="비밀번호 확인"
            />
            {passwordConfirm.length > 0 && (
              <Text>{passwordConfirmMessage}</Text>
            )}
          </View>
          <View>
            <Button
              title="확인"
              disabled={
                isEmail && isPassword && isPasswordConfirm ? false : true
              }
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterScreen;
