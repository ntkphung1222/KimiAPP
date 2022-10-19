import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
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
    value: 'Thông tin cá nhân',
    iconname: 'user',
    icontype: 'antdesign',
    color: color.primary,
  },
  {
    id: '2',
    value: 'Đơn hàng của tôi',
    iconname: 'shopping-cart',
    icontype: 'feather',
    color: '#01B383',
  },
  {
    id: '3',
    value: 'Địa chỉ nhận hàng',
    iconname: 'location-pin',
    icontype: 'entypo',
    color: color.red,
  },
  {
    id: '4',
    value: 'Đăng xuất',
    iconname: 'logout',
    icontype: 'materialicons',
    color: color.darkblue,
  },
];
const option2Array = [
  {
    id: '5',
    value: 'Cài đặt',
    iconname: 'settings',
    icontype: 'feather',
    color: color.darkblue,
  },
  {
    id: '6',
    value: 'Liên hệ với chúng tôi',
    iconname: 'hipchat',
    icontype: 'fontisto',
    color: color.blue,
  },
  {
    id: '7',
    value: 'Giới thiệu về ứng dụng',
    iconname: 'infocirlce',
    icontype: 'antdesign',
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
  const { container, avatarView, avatar, wrapper, optionView } = styles;
  const label = font.textBody;
  const [listItems] = useState(optionArray);
  const [listItemsSetting] = useState(option2Array);

  const logout = () => {
    AsyncStorage.removeItem('user');
    Alert.alert('Logout Successful!');
  };
  const gotoScreen = ($id) => {
    if ($id === '1') navigation.navigate('Info', { user });
    if ($id === '2') navigation.navigate('Order');
    if ($id === '3') navigation.navigate('ShippingAddress');
    if ($id === '4') logout();
  };

  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => gotoScreen(item.id)}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: item.color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          style={styles.icon}
          name={item.iconname}
          type={item.icontype}
          size={20}
          color={color.white}
        />
      </View>

      <Text style={label}>{item.value}</Text>
    </TouchableOpacity>
  );
  const ItemSeparatorView = () => (
    //Item Separator
    <View style={{ height: 0.5, width: '100%', backgroundColor: color.line }} />
  );
  return (
    <View style={container}>
      <View style={styles.bigCircle} />
      <Header title={'Tài khoản'} navigation={navigation} />
      <View style={avatarView}>
          <Image
            style={avatar}
            resizeMode="contain"
            source={{
              uri: 'https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-character-avatar-icon-image_2292190.jpg',
            }}
          />
          <Text style={label}>{user.name}</Text>
        </View>
      {/* <View style={{ height: 20, width: '100%' }} /> */}
      <View style={wrapper}>
        <FlatList
          data={listItems}
          style={optionView}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          //ListHeaderComponent={getHeader}
        />
        <FlatList
          data={listItemsSetting}
          style={optionView}
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
const avatarsize = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  avatarView: {
    //backgroundColor: color.blue,
    width,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigCircle: {
    width: 1000,
    height: 1000,
    backgroundColor: color.primary,
    borderRadius: 1000,
    position: 'absolute',
    top: -780,
    left: -300,
    right: -300
  },
  avatar: {
    width: avatarsize,
    height: avatarsize,
    borderRadius: avatarsize,
    resizeMode: 'cover',
    borderColor: color.white,
    borderWidth: 2,
  },
  wrapper: {},
  optionView: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: color.white,
    borderRadius: 20,
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  icon: {},
});
