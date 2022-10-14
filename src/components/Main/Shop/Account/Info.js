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
    labelView,
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
          <Text style={label}>Kim Phụng</Text>
        </View>
        <View style={infoView}>
          <Text style={font.labelBold}>Thông tin cá nhân</Text>
         
          <View style={rowView}>
            <View style={labelView}>
              <Text style={label}>Giới tính</Text>
            </View>
            <View style={textView}>
              <Text style={label}>Nữ</Text>
            </View>
          </View>
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: color.line }}
          />

          <View style={rowView}>
            <View style={labelView}>
              <Text style={label}>Ngày sinh</Text>
            </View>
            <View style={textView}>
              <Text style={label}>27-06-2000</Text>
            </View>
          </View>
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: color.line }}
          />

          <View style={rowView}>
            <View style={labelView}>
              <Text style={label}>Số điện thoại</Text>
            </View>
            <View style={textView}>
              <Text style={label}>0989415460</Text>
            </View>
          </View>
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: color.line }}
          />

          <View style={rowView}>
            <View style={labelView}>
              <Text style={label}>Email</Text>
            </View>
            <View style={textView}>
              <Text style={label}>ntkphung1222@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity
            style={textChangeInfo}
            onPress={() => navigation.navigate('ChangeInfo')}
          >
             <Icon style={iconChange} type="antdesign" name="edit" size={20} />
            <Text style={font.textTitle2}>Chỉnh sửa</Text>
           
          </TouchableOpacity>
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
    paddingVertical: 15,
    backgroundColor: color.white
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    //backgroundColor: color.primary,
    //paddingVertical: 5,
    //marginBottom: 10,
  },
  labelView: {
    width: width * 0.3,
  },
  textView: {
    width: width * 0.7,
  },
  textChangeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.greylight,
    borderRadius: 20,
    marginTop: 10
  },
  iconChange: {   
    marginRight: 2,
  },
});
