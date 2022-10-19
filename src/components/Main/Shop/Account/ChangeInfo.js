import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-named-as-default
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import SegmentedPicker from 'react-native-segmented-picker';
import { Input } from '@rneui/themed';
import Header from '../Header';
import color from '../../../../../assets/color';

export default function ChangeInfo({ navigation, route }) {
  const { user } = route.params;
  const [value, setValue] = useState('male');
  const title = 'Cập nhật thông tin cá nhân';
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //const [selectedDate1, setSelectedDate1] = useState('');
  //const segmentedPicker = React.createRef();
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
  const [pickedImagePath, setPickedImagePath] = useState(
    'https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-yellow-character-avatar-icon-image_2292190.jpg'
  );

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
    <ScrollView style={container}>
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
              <Image
                source={{ uri: pickedImagePath }}
                resizeMode="contain"
                style={avatar}
              />
            )}
            <TouchableOpacity style={iconCamera} onPress={showImagePicker}>
              <Icon type="feather" name="camera" size={20} color={color.gray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={infoView}>
          <Text style={label}>Họ tên</Text>
          <TextInput style={input} value={user.name} />
          <Text style={label}>Giới tính</Text>

          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={radioGroup}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="male" />
                <Text> Nam</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="female" />
                <Text> Nữ</Text>
              </View>
            </View>
          </RadioButton.Group>

          {/* <Text style={label}>{pickedImagePath }</Text> */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>{`${
              selectedDate
                ? moment(selectedDate).format('DD/MM/YYYY')
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
              maximumDate={new Date()}
              minimumDate={new Date('1900-01-01')}
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
          <Input keyboardType={'email-address'} value={user.email} />
          <TouchableOpacity style={styles.saveChangesButton}>
            <Text style={styles.textSaveChangeButton}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const { width } = Dimensions.get('window');
const avatarsize = 120;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {},
  avatarView: {
    //backgroundColor: color.blue,
    width,
    height: 200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    paddingHorizontal: 20,
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
  saveChangesButton: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 25,
    //flex: 0.2,
    width: width - 40,
    //marginHorizontal: 20,
    right: 0,
    bottom: 0,
  },
  textSaveChangeButton: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

// import React from 'react';
// import SegmentedPicker from 'react-native-segmented-picker';

// class ChangeInfo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.segmentedPicker = React.createRef();
//   }

//   componentDidMount() {
//     // Can alternatively be shown with the `visible` prop for redux etc.
//     this.segmentedPicker.current.show();
//   }

//   onConfirm = (selections) => {
//     console.info(selections);
//     // => { col_1: "option_1", col_2: "option_3" }
//   }

//   render() {
//     return (
//       <SegmentedPicker
//         ref={this.segmentedPicker}
//         onConfirm={this.onConfirm}
//         options={[
//           {
//             key: 'day',
//             items: [
//               { label: 1, value: 'option_1' },
//               { label: 2, value: 'option_2' },
//             ],
//           },
//           {
//             key: 'month',
//             items: [
//               { label: '1', value: 'jan' },
//               { label: '2', value: 'feb' },
//               { label: '3', value: 'mar' },
//               { label: '4', value: 'apr' },
//               { label: '5', value: 'may' },
//               { label: '6', value: 'jun' },
//               { label: '7', value: 'jul' },
//               { label: '8', value: 'aug' },
//               { label: '9', value: 'sep' },
//               { label: '10', value: 'oct' },
//               { label: '11', value: 'nov' },
//               { label: '12', value: 'dec' },
//             ],
//           },
//           {
//             key: 'year',
//             items: [
//               { label: '1900', value: '1900' },
//               { label: '1901', value: '1901' },
//               { label: '1902', value: '1902' },
//               { label: '1903', value: '1903' },
//               { label: '1904', value: '1904' },
//               { label: '1905', value: '1905' },
//               { label: '1906', value: '1906' },
//             ],
//           },
//         ]}
//       />
//     );
//   }
// }

// export default ChangeInfo;
