import React, { useState } from 'react';
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
    value: 'Địa chỉ nhận hàng',
    iconname: 'location',
    icontype: 'entypo',
    color: color.red,

  },
  {
    id: '3',
    value: 'Đổi mật khẩu',
    iconname: 'lock',
    icontype: 'simplelineicons',
    color: color.blue,

  },
  {
    id: '4',
    value: 'Đăng xuất',
    iconname: 'logout',
    icontype: 'materialicons',
    color: color.yellow,

  },
];
export default function Account({ navigation }) {
  const { container, header, avatar, wrapper } = styles;
  const label = font.label;
  const [listItems] = useState(optionArray);
  const gotoScreen = ($id) => {
    if ($id === '1') navigation.navigate('Info');
    if ($id === '2') navigation.navigate('ShippingAddress');
    if ($id === '3') navigation.navigate('ChangePassword');
    if ($id === '4') navigation.navigate('Signin');
  };
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity style={styles.item} onPress={() => gotoScreen(item.id)}>
      <View style={styles.item}>
        <Icon
          style={styles.icon}
          name={item.iconname}
          type={item.icontype}
          size={25}
          color={item.color}
        />
        <Text style={label}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );
  const ItemSeparatorView = () => (
    //Item Separator
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
  );
  return (
    <View style={container}>
      <View style={header}>
        <Image
          style={avatar}
          resizeMode="contain"
          source={{
            uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
          }}
        />
        <Text> Kim Phụng </Text>
      </View>
      <View style={wrapper}>
        <FlatList
          data={listItems}
          style={wrapper}
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
const { width, height } = Dimensions.get('window');
const headerheight = height / 3;
const avatarsize = 120;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: color.primary,
    width,
    height: headerheight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: avatarsize,
    height: avatarsize,
    borderRadius: avatarsize,
    backgroundColor: '#333',
  },
  wrapper: {
    //paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    marginRight: 5,
  },
});
