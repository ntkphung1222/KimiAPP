import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-named-as-default
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Input } from '@rneui/themed';
import Header from '../Header';
import color from '../../../../../assets/color';

export default function ChangeInfo({ navigation }) {
  //const product = route.params.product;
  const [value, setValue] = useState('first');
  const title = 'Cập nhật thông tin cá nhân';
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Datetime Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const {
    container,
    wrapper,
    avatar,
    avatarView,
    iconCamera,
    infoView,
    input,
    label,
    radioGroup,
  } = styles;
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-character-avatar-icon-image_2292190.jpg');

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View style={avatarView}>
          {/* <Image
            style={avatar}
            resizeMode="contain"
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
            }}
          /> */}
          <View>
            {pickedImagePath !== '' && (
              <Image source={{ uri: pickedImagePath }} resizeMode="contain" style={avatar} />
            )}
            <TouchableOpacity style={iconCamera} onPress={showImagePicker}>
              <Icon type="feather" name="camera" size={20} color={color.gray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={infoView}>
          <Text style={label}>Họ tên khách hàng</Text>
          <Input style={input} />
          <Text style={label}>Giới tính</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={radioGroup}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="first" />
                <Text> Nam</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="second" />
                <Text> Nữ</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="third" />
                <Text> Khác</Text>
              </View>
            </View>
          </RadioButton.Group>

          {/* <Text style={label}>{pickedImagePath }</Text> */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>{`${
              selectedDate
                ? moment(selectedDate).format('MM-DD-YYYY')
                : 'Chọn ngày sinh'
            }`}</Text>
            <Icon
              type="antdesign"
              onPress={showDatePicker}
              name="calendar"
              color={color.blue}
            />
            {/* <Button title="Show" onPress={showDatePicker} /> */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Text style={label}>Số điện thoại</Text>
          <Input
            maxLength={10}
            textContentType={Number}
            keyboardType={'number-pad'}
          />
          <Text style={label}>Email</Text>
          <Input keyboardType={'email-address'} />
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
  infoView: {
    paddingHorizontal: 16,
  },
  avatar: {
    position: 'relative',
    width: avatarsize,
    height: avatarsize,
    borderRadius: avatarsize,
    resizeMode: 'cover',
    backgroundColor: '#333',
  },
  iconCamera: {
    position: 'absolute',
    color: 'gray',
    bottom: 0,
    right: 20,
  },
  input: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
