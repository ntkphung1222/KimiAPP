import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome } from '@expo/vector-icons';
import color from '../../../assets/color';
import font from '../../../assets/font';
import fb from '../../images/fb.png';
import google from '../../images/google.png';
import signIn from '../../api/signIn';
import global from '../global';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  // global.onSignIn = onSignIn;
  // const onSignIn = (user) => setUser(user);

  // eslint-disable-next-line no-shadow
  
  // const ref = useRef('');
  //   // const [userCurrent, setUserCurrent] = useState();
  // const submit = () => {
  //   Alert.alert('form submit, thank you.');
  // };
  const handleSubmit = () => {
    //this.ref.form.submit();
    signIn(email, password)
    .then(res => {
      setUser(res.user);
      global.userCurrent = user;
      //navigation.navigate('Account', { user: res.user });
    })
    .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={font.textTitle}>Đăng nhập</Text>
        <Form onSubmit={handleSubmit}>
          <InputText
            name="email"
            // label="email"
            validateNames={['required']}
            errorMessages={['Vui lòng nhập đầy đủ thông tin']}
            placeholder="Email/ Số điện thoại"
            type="text"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={
              <FontAwesome name="user-o" color={color.darkblue} size={20} />
            }
            invalidIcon={
              <Icon
                type="feather"
                name="alert-circle"
                color={color.red}
                size={20}
              />
            }
            validIcon={
              <Icon
                type="feather"
                name="check-circle"
                color={color.primary}
                size={20}
              />
            }
            style={styles.inputStyle}
            containerStyle={styles.input}
          />
          <InputText
            name="password"
            secureTextEntry
            passwordHideIcon={
              <Icon
                name="eye-off"
                color={color.darkblue}
                size={20}
                type="feather"
              />
            }
            passwordShowIcon={
              <Icon
                name="eye"
                color={color.darkblue}
                size={20}
                type="feather"
              />
            }
            validateNames={['required']}
            errorMessages={[
              'Vui lòng nhập mật khẩu',
              // eslint-disable-next-line max-len
              // 'Tối thiểu 8 kí tự, trong đó có ít nhất 1 kí tự viết hoa, 1 kí tự viết thường và 1 chữ số',
            ]}
            type="text"
            value={password}
            placeholder="Mật khẩu"
            leftIcon={
              <FontAwesome name="lock" color={color.darkblue} size={20} />
            }
            onChangeText={(text) => setPassword(text)}
            labelStyle={styles.labelStyle}
            style={styles.inputStyle}
            containerStyle={styles.input}
            floatingTopValue={5}
            floatingFontSize={5}
          />
          <View style={styles.forgotPasswordView}>
            <Text
              style={font.label}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Quên mật khẩu?
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.button}
          >
            <Text style={styles.textButton}>Đăng nhập</Text>
          </TouchableOpacity>
        </Form>
      </View>
      <View style={styles.signUpBar}>
        <Image source={fb} style={styles.imageStyle} />
        <Image source={google} style={styles.imageStyle} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={font.label}> Chưa có tài khoản?</Text>
        <Text
          style={font.labelBold}
          onPress={() => navigation.navigate('Signup')}
        > Đăng ký
        </Text>
      </View>
    </View>
  );
};

export default Signin;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: 10
  },
  wrapper: {
    width,
    //height: 400,
    borderRadius: 40,
    padding: 20,
    backgroundColor: color.white,
  },
  textBody: {
    fontFamily: 'SFProDisPlayRegular',
    fontSize: 16,
    color: color.darkblue,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 25,
  },
  textButton: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  inputStyle: {
    color: color.text,
    paddingTop: 0,
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 10,
    borderWidth: 2,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.primary,
    borderBottomColor: color.primary,
    borderRadius: 15,
    height: 50,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  inputContainerStyle: {
    paddingBottom: 10,
    paddingTop: 13,
    borderWidth: 2,
    borderBottomWidth: 2,
    // borderColor: "#333333",
    // borderBottomColor: "#333333",
    borderColor: color.primary,
    borderBottomColor: color.primary,
    borderRadius: 15,
  },
  inputIconStyle: {
    marginHorizontal: 10,
    fontSize: 2.4,
    backgroundColor: '#333333',
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  signUpBar: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 30,
    height: 30,
    margin: 10,
  },
  forgotPasswordView: {
    marginVertical: 2,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
});
