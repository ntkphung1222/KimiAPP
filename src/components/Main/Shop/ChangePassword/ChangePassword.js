import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome } from '@expo/vector-icons';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';
import Header from '../Header';

class ChangeInfo extends React.Component {
  state = {
    user: { password: '', repeatPassword: '' },
  };
  
  componentDidMount() {
    //You can add your own rules
    Form.addValidationRule('isValidPassword', (value) => {
      const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (passwordReg.test(value) === false) {
        return false;
      }
      return true;
    });
    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }
  componentWillUnmount() {
    // Remove own rules
    Form.removeValidationRule('isPasswordMatch');
    Form.removeValidationRule('isValidPassword');
  }

  handlePassword = (event) => {
    const { user } = this.state;
    user.password = event.nativeEvent.text;
    this.setState({ user });
  };

  handleRepeatPassword = (event) => {
    const { user } = this.state;
    user.repeatPassword = event.nativeEvent.text;
    this.setState({ user });
  };

  handleChange = (email) => {
    this.setState({ email });
  };

  handleFirstName = (firstName) => {
    this.setState({ firstName });
  };
  handleNumber = (number) => {
    this.setState({ number });
  };
  submit = () => {
    Alert.alert('form submit, thank you.');
  };
  handleSubmit = () => {
    this.refs.form.submit();
  };
  render() {
    const { user } = this.state;
    const textPlaceHolder = font.label;
    return (
      <View style={styles.container}>
        <Header title="Đổi mật khẩu" navigation={this.props.navigation} />
        <View style={styles.wrapper}>
          <Form ref="form" onSubmit={this.submit}>
            <InputText
              name="password"
              secureTextEntry
              passwordHideIcon={
                <Icon
                  name="eye-off"
                  color={color.text}
                  size={20}
                  type="feather"
                />
              }
              passwordShowIcon={
                <Icon name="eye" color={color.text} size={20} type="feather" />
              }
              validateNames={['isValidPassword', 'required']}
              errorMessages={[
                // eslint-disable-next-line max-len
                'Minimum eight characters, at least one uppercase constter, one lowercase constter and one number',
                'This field is required',
              ]}
              type="text"
              value={user.password}
              placeholder="Nhập mật khẩu"
              leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
              onChange={this.handlePassword}
              labelStyle={styles.labelStyle}
              style={textPlaceHolder}
              containerStyle={styles.input}
              floatingTopValue={5}
              floatingFontSize={5}
            />
            <InputText
              name="repeatPassword"
              secureTextEntry
              validateNames={['isPasswordMatch', 'required']}
              errorMessages={[
                'Mật khẩu nhập lại không khớp',
                'Vui lòng nhập lại mật khẩu',
              ]}
              type="text"
              value={user.repeatPassword}
              placeholder="Nhập lại mật khẩu"
              onChange={this.handleRepeatPassword}
              // invalidIcon={
              //   <Feather name="alert-circle" color="red" size={20} />
              // }
              passwordHideIcon={
                <Icon
                  name="eye-off"
                  color={color.text}
                  size={20}
                  type="feather"
                />
              }
              passwordShowIcon={
                <Icon name="eye" color={color.text} size={20} type="feather" />
              }
              leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
              labelStyle={styles.labelStyle}
              style={textPlaceHolder}
              containerStyle={styles.input}
              floatingTopValue={5}
              floatingFontSize={5}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.handleSubmit}
              style={styles.button}
            >
              <Text style={styles.textButton}>Gửi</Text>
            </TouchableOpacity>
          </Form>
        </View>
      </View>
    );
  }
}

export default ChangeInfo;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    // alignItems: 'center',
    // justifyContent: 'center',
    //paddingHorizontal: 10
  },
  wrapper: {
    width,
    //height: 400,
    borderRadius: 40,
    padding: 20,
    //backgroundColor: color.white,
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
});
