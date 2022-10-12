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
    email: '',
  }; 

  handleChange = (email) => {
    this.setState({ email });
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
                containerStyle={styles.input}
                // floatingTopValue={5}
                // floatingFontSize={5}
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

export default DateChoose;
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
  button: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 25
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
    height: 50
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

