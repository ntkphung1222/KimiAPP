import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome, Feather } from '@expo/vector-icons';
import color from '../../../assets/color';
import font from '../../../assets/font';
import fb from '../../images/fb.png';
import google from '../../images/google.png';

import register from '../../api/signUp';

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSuccess = () => {
    Alert.alert(
      'Thông báo',
      'Thành công',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Signin'),
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  const onFail = () => {
    Alert.alert(
      'Thông báo',
      'Thất bại',
      [
        {
          text: 'OK',
          onPress: () => setEmail(''),
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  const handleSubmit = () => {
    register(email, firstName, password)
      .then((res) => {
        if (res.success) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => onFail());
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={font.textTitle}> Đăng ký</Text>
        <Form>
          <InputText
            name="firstName"
            placeholder="Nhập họ tên"
            validateNames={['required', 'isString', 'maxStringLength:30']}
            errorMessages={[
              'Vui lòng nhập họ tên',
              'Only characters allowed',
              'Max character limit is 30',
            ]}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            type="text"
            leftIcon={
              <FontAwesome name="user-o" color={color.darkblue} size={20} />
            }
            invalidIcon={<Feather name="alert-circle" color="red" size={20} />}
            validIcon={
              <Feather name="check-circle" color={color.primary} size={20} />
            }
            labelStyle={styles.labelStyle}
            style={styles.inputStyle}
            containerStyle={styles.input}
            floatingTopValue={5}
            floatingFontSize={5}
          />
          <InputText
            name="phone"
            placeholder="Nhập số điện thoại"
            validateNames={[
              'required',
              'isNumber',
              'minStringLength:10',
              'maxStringLength:10',
            ]}
            errorMessages={[
              'Vui lòng nhập số điện thoại',
              'Chỉ cho phép chữ số',
              'Số điện thoại chưa hợp lệ',
              'Số điện thoại chưa hợp lệ',
            ]}
            value={number}
            onChangeText={(text) => setNumber(text)}
            type="text"
            leftIcon={
              <FontAwesome name="phone" color={color.darkblue} size={20} />
            }
            invalidIcon={<Feather name="alert-circle" color="red" size={20} />}
            validIcon={
              <Feather name="check-circle" color={color.primary} size={20} />
            }
            labelStyle={styles.labelStyle}
            style={styles.inputStyle}
            containerStyle={styles.input}
            floatingTopValue={5}
            floatingFontSize={5}
          />
          <InputText
            name="email"
            // label="email"
            validateNames={['required', 'validEmail']}
            errorMessages={['Vui lòng nhập địa chỉ email', 'Email chưa hợp lệ']}
            placeholder="Nhập địa chỉ Email"
            type="text"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={
              <Icon
                type="feather"
                name="mail"
                color={color.darkblue}
                size={20}
              />
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
            // floatingTopValue={5}
            // floatingFontSize={5}
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
            validateNames={['minStringLength:6', 'required']}
            errorMessages={[
              // eslint-disable-next-line max-len
              'Tối thiểu 6 kí tự',
              'Vui lòng nhập mật khẩu',
            ]}
            type="text"
            value={password}
            placeholder="Nhập mật khẩu"
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.button}
          >
            <Text style={styles.textButton}>Đăng ký</Text>
          </TouchableOpacity>
        </Form>
      </View>
      <View style={styles.signUpBar}>
        <Image source={fb} style={styles.imageStyle} />
        <Image source={google} style={styles.imageStyle} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={font.label}> Đã có tài khoản? </Text>
        <Text
          style={font.labelBold}
          onPress={() => navigation.navigate('Signin')}
        >
          Đăng nhập
        </Text>
      </View>
    </View>
  );
};

export default Signup;
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
});
