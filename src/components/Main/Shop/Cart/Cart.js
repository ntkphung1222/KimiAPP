import React from 'react'; 
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Input } from '@rneui/themed';
import color from '../../../../../assets/color';
import { useTogglePasswordVisibility } from '../../../Authentication/useTogglePasswordVisibility';

export default function Cart() {
  const { passwordVisibility, show, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  //const [password, setPassword] = useState('');
      return (
      //<SafeAreaView>
        <View style={styles.container}>     
        <Text style={styles.titleText}>Đăng ký</Text>
        <Input 
        placeholder='Họ và tên'
        leftIcon={{ type: 'font-awesome', name: 'user' }} 
        />
        <Input 
        placeholder='Số điện thoại'
        maxLength={10}
        textContentType={Number}
        keyboardType={'number-pad'}
        leftIcon={{ type: 'font-awesome', name: 'phone' }} 
        />
        {/* <Input 
        placeholder='Email'
        keyboardType={'email-address'}
        leftIcon={{ type: 'iconicons', name: 'email' }} 
        /> */}
        <Input 
  //       containerStyle={{
  //       width: '100%',
  //       height: 50,
  //       backgroundColor: '#C0C0C0',
  //       borderRadius: 6,
  //       marginTop: 10,
  //       paddingHorizontal: 10,
  //       fontSize: 16,
  //       color: color.text,
  // }}
        placeholder='Mật khẩu'
        leftIcon={{ name: 'vpn-key' }} 
        rightIcon={<Text onPress={handlePasswordVisibility}>{show}</Text>}
        secureTextEntry={passwordVisibility}
        autoCapitalize="none"
        autoCorrect={false}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <View style={styles.loginWithBar}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Icon
              name='facebook'
              type='font-awesome'
              color='#fff'
            />
          
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://i.imgur.com/2SToj3t.png' }} style={styles.icon} /> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://i.imgur.com/bTjkx4Y.png' }} style={styles.icon} /> 
          </TouchableOpacity>
          
        </View>
   </View>
   //</SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titleText: {
    color: color.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: color.white,
    alignSelf: 'center',
    fontFamily: 'Poppin-Medium'
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    // backgroundColor: '#3b5998',
    // padding: 14,
    // marginHorizontal: 10,
    // borderRadius: 100,
    margin: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },

});
