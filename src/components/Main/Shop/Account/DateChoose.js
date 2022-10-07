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
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome, Feather } from '@expo/vector-icons';
import color from '../../../../../assets/color';

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
    const ImageHttpURL = {
        uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
    };
    const { user } = this.state;
    return (
      <ScrollView>
        <View style={[styles.container, { marginTop: 50 }]}>
          <View style={[styles.action, { alignItems: 'center' }]}>
            <Image
              source={ImageHttpURL}
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            />
            <FontAwesome name="github" size={24} />
            <Text style={{ fontSize: 18 }}>radhakishan404</Text>
            <Text style={{ fontSize: 20, padding: 10 }}>
              validate-form-in-expo-style
            </Text>
          </View>
          <View style={styles.action}>
            <Form ref="form" onSubmit={this.submit}>
              <InputText
                name="firstName"
                label="First Name"
                placeholder="textfield with floating label"
                validateNames={['required', 'isString', 'maxStringLength:30']}
                errorMessages={[
                  'This field is required',
                  'Only characters allowed',
                  'Max character limit is 30',
                ]}
                value={this.state.firstName}
                onChangeText={this.handleFirstName}
                type="text"
                leftIcon={
                  <FontAwesome name="user-o" color="#0A3055" size={20} />
                }
                invalidIcon={
                  <Feather name="alert-circle" color="red" size={20} />
                }
                validIcon={
                  <Feather name="check-circle" color="green" size={20} />
                }
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <InputText
                name="lastName"
                placeholder="textfield without floating label"
                validateNames={['required', 'isString', 'maxStringLength:30']}
                errorMessages={[
                  'This field is required',
                  'Only characters allowed',
                  'Max character limit is 30',
                ]}
                value={this.state.lastName}
                onChangeText={this.handleLastName}
                type="text"
                leftIcon={
                  <FontAwesome name="user-o" color="#0A3055" size={20} />
                }
                invalidIcon={
                  <Feather name="alert-circle" color="red" size={20} />
                }
                validIcon={
                  <Feather name="check-circle" color="green" size={20} />
                }
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <InputText
                name="phone"
                label="Mobile"
                placeholder="textfield with only number"
                validateNames={['required', 'isNumber', 'maxStringLength:10']}
                errorMessages={[
                  'This field is required',
                  'Only numbers allowed',
                  'Max string limit is 10',
                ]}
                value={this.state.number}
                onChangeText={this.handleNumber}
                type="text"
                leftIcon={
                  <FontAwesome name="phone" color="#0A3055" size={20} />
                }
                invalidIcon={
                  <Feather name="alert-circle" color="red" size={20} />
                }
                validIcon={
                  <Feather name="check-circle" color="green" size={20} />
                }
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <InputText
                name="email"
                label="email"
                validateNames={['required', 'validEmail']}
                errorMessages={[
                  'This field is required',
                  'Enter valid email address',
                ]}
                placeholder="textfield with email validation"
                type="text"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={this.handleChange}
                leftIcon={
                  <FontAwesome name="user-o" color="#0A3055" size={20} />
                }
                invalidIcon={
                  <Feather name="alert-circle" color="red" size={20} />
                }
                validIcon={
                  <Feather name="check-circle" color="green" size={20} />
                }
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <InputText
                name="password"
                label="Password"
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
                  <Icon
                    name="eye"
                    color={color.text}
                    size={20}
                    type="feather"
                  />
                }
                validateNames={['isValidPassword', 'required']}
                errorMessages={[
                  // eslint-disable-next-line max-len
                  'Minimum eight characters, at least one uppercase constter, one lowercase constter and one number',
                  'This field is required',
                ]}
                type="text"
                value={user.password}
                placeholder="custom password validation"
                leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
                onChange={this.handlePassword}
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <InputText
                name="repeatPassword"
                label="Confirm Password"
                secureTextEntry
                validateNames={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch', 'This field is required']}
                type="text"
                value={user.repeatPassword}
                placeholder="Confirm your password"
                onChange={this.handleRepeatPassword}
                invalidIcon={
                  <Feather name="alert-circle" color="red" size={20} />
                }
                leftIcon={<FontAwesome name="lock" color="#0A3055" size={20} />}
                labelStyle={styles.labelStyle}
                style={[styles.inputStyle]}
                containerStyle={styles.inputContainerStyle}
                floatingTopValue={5}
                floatingFontSize={5}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.handleSubmit}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Submit</Text>
              </TouchableOpacity>
            </Form>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DateChoose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    width: Dimensions.get('window').width,
    padding: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  labelStyle: {
    fontSize: 1.8,
    color: color.text,
    paddingTop: 1.8,
    opacity: 0.9,
    // top: 20
  },
  inputStyle: {
    color: color.text,
    paddingTop: 10,
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

