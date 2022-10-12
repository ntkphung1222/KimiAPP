import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Header from '../Header';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';
//import color from '../../../../../assets/color';

export default function ChangeInfo({ navigation }) {
  const title = 'Thông tin cá nhân';
  const label = font.label;
  const {
    container,
    wrapper,
    avatar,
    avatarView,
    infoView,
    textChangeInfo,
    iconChange,
    rowView,
    textView,
  } = styles;

  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View style={avatarView}>
          <Image
            style={avatar}
            resizeMode="contain"
            source={{
              uri: 'https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-character-avatar-icon-image_2292190.jpg',
            }}
          />
          <TouchableOpacity
            style={textChangeInfo}
            onPress={() => navigation.navigate('ChangeInfo')}
          >
            <Text style={font.textTitle2}>Cập nhật thông tin</Text>
            <Icon style={iconChange} type="feather" name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View style={infoView}>
          <View style={rowView}>
            <Text style={label}>Họ tên</Text>
            <View style={textView}>
              <Text style={label}>Kim Phụng</Text>
            </View>
          </View>
          <View style={rowView}>
            <Text style={label}>Giới tính</Text>
            <View style={textView}>
              <Text style={label}>Nữ</Text>
            </View>
          </View>
          <View style={rowView}>
            <Text style={label}>Ngày sinh</Text>
            <View style={textView}>
              <Text style={label}>27-06-2000</Text>
            </View>
          </View>
          <View style={rowView}>
            <Text style={label}>Số điện thoại</Text>
            <View style={textView}>
              <Text style={label}>0989415460</Text>
            </View>
          </View>
          <View style={rowView}>
            <Text style={label}>Email</Text>
            <View style={textView}>
              <Text style={label}>ntkphung1222@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const avatarsize = 120;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    //paddingHorizontal: 20,
  },
  avatarView: {
    //backgroundColor: color.blue,
    width,
    height: 200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: avatarsize,
    height: avatarsize,
    borderRadius: avatarsize,
    resizeMode: 'cover',
    backgroundColor: '#333',
  },
  infoView: {
    paddingHorizontal: 20,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textView: {
    width: 250,
    height: 50,
    backgroundColor: color.borderSecond,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChangeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconChange: {
    marginLeft: 2,
  },
});
