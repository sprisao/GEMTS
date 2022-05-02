import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';

import React, {useState, useEffect, useRef, useCallback} from 'react';

import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../../navigation/HomeStackParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import FastImage from 'react-native-fast-image';

type loginScreenProp = NativeStackNavigationProp<HomeStackParamList, 'Login'>;

interface Props {}
const LoginScreen = ({}: Props) => {
  const navigation = useNavigation<loginScreenProp>();

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(true);

  const scrollRef = useRef();

  // 구글 로그인
  const onGoogleButtonPress = useCallback(async () => {
    setLoading(true);
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          navigation.navigate('Profile');
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  // 제출 -> handleSubmit
  const handleSubmit = useCallback(async () => {
    console.log('로그인 시도');
    setLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        // Todo : catch를 두번 사용할 필요가 있을까? JS문 내에서 해결되는지 시도해볼것
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/too-many-requests') {
            Alert.alert('잘못된 비밀번호', '비밀번호를 확인 해 주세요 ');
          }
          if (error.code === 'auth/user-not-found') {
            Alert.alert(
              '사용자 찾을 수 없음',
              '해당 이메일로 가입된 사용자가 없습니다.',
            );
          }
          if (error.code === 'auth/too-many-requests') {
            Alert.alert('너무 많은 로그인 시도', '잠시 뒤 다시 시도해 주세요');
          }
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleScroll = () => {
    scrollRef.current.scrollToEnd({animated: 'true'});
  };

  // 이메일 유효성 검사
  const onChangeEmail = useCallback(
    e => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('올바른 이메일 형식을 입력해주세요!');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    },
    [email],
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e);
    },
    [password],
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.contentsContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/images/BI/logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>로그인</Text>
          </View>
          <View style={styles.formContainer}>
            {loading ? <ActivityIndicator /> : null}
            {/* Todo: 이메일 형식 체크 후 Input 박스 색 변화 */}
            <TextInput
              style={styles.textInput}
              blurOnSubmit={true}
              onChangeText={e => onChangeEmail(e)}
              autoCapitalize="none"
              onFocus={handleScroll}
              placeholder="이메일"
            />
            {/* {!isEmail ? (
              <View style={styles.errorMsg_Container}>
                <Text style={styles.errorMsg}>{emailMessage}</Text>
              </View>
            ) : null} */}

            <TextInput
              style={styles.textInput}
              blurOnSubmit={true}
              placeholder="비밀번호"
              autoCapitalize="none"
              secureTextEntry={true}
              onFocus={handleScroll}
              onChangeText={e => onChangePassword(e)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => handleSubmit()}>
            <Text style={styles.loginBtn_Text}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginBtn, styles.loginBtn_Google]}
            onPress={() => onGoogleButtonPress()}>
            <Image
              source={require('../../../assets/images/SNS/google.png')}
              style={styles.loginBtn_Logo}
            />
            <Text>Google 계정으로 계속하기</Text>
          </TouchableOpacity>

          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text>이메일로 3초만에 가입하기 {'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PwReset')}>
              <Text>비밀번호 재설정 {'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {marginBottom: 300},
      android: {marginBottom: 15},
    }),
  },
  contentsContainer: {
    flex: 1,
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  logo: {
    width: 50,
    height: 55,
  },
  titleContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 0.3,
    paddingVertical: 15,
  },
  titleText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Light'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
    fontSize: 24,
  },
  formContainer: {
    width: '100%',
    marginVertical: 5,
  },
  textInput: {
    marginTop: 13,
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 0.3,
    backgroundColor: '#f5f5f5',
    height: 50,
  },
  errorMsg_Container: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  errorMsg: {
    color: 'red',
  },
  loginBtn: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#4E8ef7',
    borderRadius: 20,
  },
  loginBtn_Logo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  loginBtn_Text: {
    color: 'white',
    fontSize: 15,
  },
  loginBtn_Google: {
    backgroundColor: 'white',
    borderWidth: 0.2,
    // justifyContent: "flex-start",
  },
  optionsContainer: {
    width: '99%',
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
});
