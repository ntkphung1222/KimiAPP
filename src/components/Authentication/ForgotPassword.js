// import React from 'react';
// import { StyleSheet, View, Text, Dimensions } from 'react-native';

// import color from '../../../assets/color';

// export default function ForgotPassword() {
//   const { container, wrapper, textTitle, textBody } = styles;
  
//   return (
//     <View style={container}>
//       <View style={wrapper}>
//         <Text style={textTitle}> Quên mật khẩu?</Text>
//         <Text style={textBody}>
//           Nhập địa chỉ email mà bạn đã liên kết với tài khoản này
//         </Text>
    
//       </View>
//     </View>
//   );
// }

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wrapper: {
//     width,
//     height: 200,
//     backgroundColor: color.white,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textTitle: {
//     fontFamily: 'SFProDisplaySemiBold',
//     fontSize: 28,
//     color: color.darkblue,
//   },
//   textBody: {
//     fontFamily: 'SFProDisPlayRegular',
//     fontSize: 16,
//     color: color.darkblue,
//     marginHorizontal: 20,
//     textAlign: 'center',
//   },
// });


// import React, { useState } from 'react';
// import { TextInput } from 'react-native-paper';
// //import { Icon } from 'react-native-elements';

// const MyComponent = () => {
//   const [text, setText] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(true);

//   return (
//     <TextInput
//       label="Password"
//       secureTextEntry={passwordVisible}
//       right={
//         <TextInput.Icon
//           icon={passwordVisible ? 'eye' : 'eye-off'}
//           onPress={() => setPasswordVisible(!passwordVisible)}
//         />
//       }
//     />
//   );
// };

// export default MyComponent;

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import color from '../../../assets/color';

class DateChoose extends React.Component {
  state = {
    firstName: '',
    number: '',
    lastName: '',
    email: '',
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
  handleLastName = (lastName) => {
    this.setState({ lastName });
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
    return (
     
        <View style={styles.container}>
          <View style={styles.wrapper}>
                  <Text style={styles.textTitle}> Quên mật khẩu?</Text>
        <Text style={styles.textBody}>
          Nhập địa chỉ email mà bạn đã liên kết với tài khoản này
        </Text>
            <Form ref="form" onSubmit={this.submit}>
              <InputText
                name="email"
                // label="email"
                validateNames={['required', 'validEmail']}
                errorMessages={[
                  'Vui lòng nhập địa chỉ email',
                  'Enter chưa hợp lệ',
                ]}
                placeholder="Email"
                type="text"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={this.handleChange}
                leftIcon={
                    <Icon type="feather" name="mail" color={color.black} size={16} />
                }
                invalidIcon={
                    <Icon type="feather" name="alert-circle" color={color.red} size={16} />
                }
                validIcon={
                    <Icon type="feather" name="check-circle" color={color.primary} size={16} />
                }
                style={styles.inputStyle}
                containerStyle={styles.inputContainerStyle}
                // floatingTopValue={5}
                // floatingFontSize={5}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.handleSubmit}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Gửi</Text>
              </TouchableOpacity>
            </Form>
          </View>
        </View>

    );
  }
}

export default DateChoose;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width,
    //height: 400,
    borderRadius: 40,
    padding: 20,
    backgroundColor: color.white
  },
    textTitle: {
    fontFamily: 'SFProDisplaySemiBold',
    fontSize: 28,
    color: color.darkblue,
    textAlign: 'center'
  },
  textBody: {
    fontFamily: 'SFProDisPlayRegular',
    fontSize: 16,
    color: color.darkblue,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 25
  },
  appButtonText: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  inputStyle: {
    color: color.text,
    paddingTop: 0,
  },
  inputContainerStyle: {
    paddingHorizontal: 10,
    borderWidth: 2,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.primary,
    borderBottomColor: color.primary,
    borderRadius: 15,
    height: 48
  },
//   inputIconStyle: {
//     marginHorizontal: 10,
//     fontSize: 2.4,
//     backgroundColor: '#333333',
//     borderRadius: 5,
//     alignSelf: 'center',
//     paddingHorizontal: 0,
//     paddingVertical: 0,
//   },
});

