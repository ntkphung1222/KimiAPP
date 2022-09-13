// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// //import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as React from 'react';
// import Home from './Home/Home';
// import Menu from './Menu';

// const Drawer = createDrawerNavigator();
// //const Stack = createNativeStackNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator >
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Menu" component={Menu} />
//     </Drawer.Navigator>
//   );
// }

// export default function Main() {
//     return (
//         <NavigationContainer>
//         <MyDrawer />
//         </NavigationContainer>
    
//     );
//   }
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import color from '../../../../../assets/color';

export default function Contact({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Đăng nhập</Text>
        <TextInput
          placeholder='Số điện thoại'
          placeholderTextColor='#000'
          style={styles.input}
          maxLength={10}
          autoCapitalize={false}
          keyboardType='default'
          textContentType='none'
        />
        <TextInput
          placeholder='Mật khẩu'
          placeholderTextColor='#000'
          style={styles.input}
          secureTextEntry
          textContentType='password'
        />
        <TouchableOpacity>
          <Text style={styles.fpText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
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
        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={[styles.signUpText, { color: '#3DBCAF' }]}>
              {' Đăng ký '}
            </Text>
          </TouchableOpacity>
        </View>
      {/* </LinearGradient> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: color.primary,
    alignSelf: 'center',
  },
  loginText: {
    color: color.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#C0C0C0',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: color.text,
  },
  fpText: {
    alignSelf: 'flex-end',
    color: color.primary,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
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
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: color.text,
    fontSize: 20,
    //fontfamily: 'Poppin-Medium',
    fontWeight: '500',
  },
});
