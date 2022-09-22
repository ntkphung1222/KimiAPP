import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import color from '../../../assets/color';
//import { Icon } from 'react-native-elements';
//import gmail from '../../images/gmail.png';

//import { LinearGradient } from 'expo-linear-gradient';

export default class Authentication extends React.Component {
  constructor() {
    super();
    this.state = {
      isSignIn: true,
    };
  }
  signIn() {
    this.setState({ isSignIn: true });
  }
  signUp() {
    this.setState({ isSignIn: false });
  }
  render() {
    const {
      container,
      header,
      buttonStyle,
      textButtonStyle,
      controlStyle,
      activeStyle,
      inActiveStyle,
      signInStyle,
      signUpStyle,
    } = styles;
    const signInJSX = (
      <View>
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          maxLength={10}
          //autoCapitalize={false}
          keyboardType="number-pad"
          //textContentType="none"
        />
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          secureTextEntry
          autoCapitalize={false}
          keyboardType="default"
          textContentType="password"
        />
        <TouchableOpacity style={buttonStyle}>
          <Text style={textButtonStyle}> ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <View style={styles.loginWithBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://i.imgur.com/2SToj3t.png' }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://i.imgur.com/bTjkx4Y.png' }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    const signUpJSX = (
      <View>
        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          maxLength={10}
          //autoCapitalize={false}
          keyboardType="default"
          //textContentType="none"
        />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          maxLength={10}
          //autoCapitalize={false}
          keyboardType="number-pad"
          //textContentType="none"
        />
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          secureTextEntry
          autoCapitalize={false}
          keyboardType="default"
          textContentType="password"
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          style={styles.input}
          secureTextEntry
          autoCapitalize={false}
          keyboardType="default"
          textContentType="password"
        />
        <TouchableOpacity style={buttonStyle}>
          <Text style={textButtonStyle}> ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <View style={styles.loginWithBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://i.imgur.com/2SToj3t.png' }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{ uri: 'https://i.imgur.com/bTjkx4Y.png' }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
    const { isSignIn } = this.state;
    const mainJSX = isSignIn ? signInJSX : signUpJSX;
    return (
      <View style={container}>
        <View style={header}>
          <Text>header</Text>
        </View>
        {mainJSX}
        <View style={controlStyle}>
          <TouchableOpacity
            style={signInStyle}
            onPress={this.signIn.bind(this)}
          >
            <Text style={isSignIn ? activeStyle : inActiveStyle}>
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={signUpStyle}
            onPress={this.signUp.bind(this)}
          >
            <Text style={!isSignIn ? activeStyle : inActiveStyle}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const { width } = Dimensions.get('window');
const marginControl = (width - 340) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    padding: 20,
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    marginBottom: 10,
    backgroundColor: color.white,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 16,
    color: color.text,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonStyle: {
    color: color.white,
    fontWeight: '700',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    marginRight: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
  controlStyle: {
    flexDirection: 'row',
    width: 300,
    marginHorizontal: marginControl,
  },
  activeStyle: {
    color: color.primary,
  },
  inActiveStyle: {
    color: color.greylight,
  },
  signInStyle: {
    backgroundColor: color.white,
    flex: 1,
    marginRight: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  signUpStyle: {
    backgroundColor: color.white,
    flex: 1,
    marginLeft: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
});
