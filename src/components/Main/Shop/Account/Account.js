import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
//import global from '../../../global';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

const optionArray = [
  {
    id: '1',
    value: 'Đơn hàng của tôi',
    iconname: 'receipt',
    icontype: 'material',
    color: color.darkblue,
  },
  {
    id: '2',
    value: 'Địa chỉ nhận hàng',
    iconname: 'location',
    icontype: 'entypo',
    color: color.darkblue,
  },
  {
    id: '3',
    value: 'Đổi mật khẩu',
    iconname: 'lock',
    icontype: 'simplelineicons',
    color: color.darkblue,
  },
  {
    id: '4',
    value: 'Đăng xuất',
    iconname: 'logout',
    icontype: 'materialicons',
    color: color.darkblue,
  },
];
export default function Account({ navigation }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('user').then((userR) => {
      //console.log(userR);
      if (userR !== null) {
        const userCurrent = JSON.parse(userR);
        setUser(userCurrent);
      } else {
        navigation.navigate('Signin');
      }
    });
  }, []);
  //const user = global.userCurrent;
  //const userID = route.params.userID;

  //const { id, name, email, email_verified_at, created_at, updated_at } = route.params.user;
  const { container, header, avatar, wrapper } = styles;
  const label = font.label;
  const [listItems] = useState(optionArray);
  const logout = () => {
    AsyncStorage.removeItem('user');
    //setUser([]);
    //navigation.navigate('Main');
  };
  const gotoScreen = ($id) => {
    if ($id === '1') navigation.navigate('Order');
    if ($id === '2') navigation.navigate('ShippingAddress');
    if ($id === '3') navigation.navigate('ChangePassword');
    if ($id === '4') logout();
  };
  
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => gotoScreen(item.id)}
    >
      <Icon
        style={styles.icon}
        name={item.iconname}
        type={item.icontype}
        size={20}
        color={item.color}
      />
      <Text style={label}>{item.value}</Text>
    </TouchableOpacity>
  );
  const ItemSeparatorView = () => (
    //Item Separator
    <View style={{ height: 0.5, width: '100%', backgroundColor: color.line }} />
  );
  return (
    <View style={container}>
      <Header title={'Tài khoản'} navigation={navigation} />
      <TouchableOpacity
        style={header}
        onPress={() => navigation.navigate('Info', { user })}
      >
        <Image
          style={avatar}
          resizeMode="contain"
          source={{
            uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
          }}
        />
        <View>
          <Text>{user.name}</Text>
          <Text>Thông tin cá nhân</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 20, width: '100%' }} />
      <View style={wrapper}>
        <FlatList
          data={listItems}
          //style={wrapper}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          //ListHeaderComponent={getHeader}
        />
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const headerheight = 100;
const avatarsize = 80;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: color.white,
    flexDirection: 'row',
    width,
    height: headerheight,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatar: {
    width: avatarsize,
    height: avatarsize,
    borderRadius: avatarsize,
  },
  wrapper: {
    backgroundColor: color.white,
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    marginRight: 5,
  },
});
