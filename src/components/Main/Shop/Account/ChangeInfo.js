/* eslint-disable no-nested-ternary */
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
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line import/no-named-as-default
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import changeInfo from '../../../../api/changeInfo';
import Header from '../Header';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function ChangeInfo({ navigation, route }) {
    const { user } = route.params;
    //const [userCurrent, setUserCurrent] = useState(user);
    const [name, setName] = useState(user.kh_ten);
    const [gender, setGender] = useState(user.kh_gioitinh);
    const [selectedDate, setSelectedDate] = useState(user.kh_ngaysinh);

    const [number, setNumber] = useState(user.kh_sodienthoai);
    //const [data, setData] = useState(null);
    const title = 'Cập nhật thông tin cá nhân';
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
    } = styles;

    const onPress = (val) => {
        setGender(val);
    };
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState(
        `http://kimimylife.site/kh_avatar/${user.kh_anhdaidien}`
    );

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                "You've refused to allow this appp to access your photos!"
            );
            return;
        }
        const option = {
            selectionLimit: 1,
            mediaTypes: 'Images',
            base64: false,
        };
        const result = await ImagePicker.launchImageLibraryAsync(option);
        console.log(result);

        if (result.cancelled) {
            return;
        }
        setPickedImagePath(result.uri);
        const localUri = result.uri;
        const filename = localUri.split('/').pop().replace('.jpeg', '.png');

        const match = /\.(\w+)$/.exec(filename);
        // eslint-disable-next-line quotes
        const type = match ? `image/${match[1]}` : `image`;

        // eslint-disable-next-line no-undef
        const formData = new FormData();
        formData.append('file', { uri: localUri, name: filename, type });

        // eslint-disable-next-line no-undef
        return await fetch(
            `http://kimimylife.site/api/uploadAvatar?kh_email=${user.kh_email}`,
            {
                method: 'POST',
                header: {
                    'content-type': 'multipart/form-data',
                },
                body: formData,
            }
        )
            .then(() => console.log('ok'))
            .catch((error) => console.log(error));
    };

    const onSuccess = () => {
        Alert.alert(
            'Thông tin đã được cập nhật',
            'Vui lòng đăng nhập lại.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Signin'),
                },
            ],
            {
                cancelable: false,
            }
        );
    };
    //const renderLabel = (text) => <Text style={styles.renderlabel}>{text}</Text>;
    function handleSubmit() {
        if (name === '' || selectedDate === null || number === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        changeInfo(
            user.kh_email,
            name,
            gender,
            moment(selectedDate).format('YYYY-MM-DD').toString(),
            number
        )
            .then((res) => {
                if (res.success) {
                    //AsyncStorage.removeItem('user');
                    //setUserCurrent(res.user);
                    AsyncStorage.setItem('user', JSON.stringify(res.user));
                    onSuccess();
                }
                //console.log(res);
            })
            //.then(() => navigation.navigate('Shop'))
            .catch((error) => console.log(error));
    }
    return (
        <View style={container}>
            <Header navigation={navigation} title={title} />
            <ScrollView style={wrapper}>
                <View style={avatarView}>
                    <View>
                        {pickedImagePath !==
                        'http://kimimylife.site/kh_avatar/null' ? (
                            <Image
                                source={{
                                    uri: pickedImagePath,
                                }}
                                resizeMode="contain"
                                style={avatar}
                            />
                        ) : (
                            <Image
                                source={{
                                    uri: 'http://kimimylife.site/kh_avatar/userAvatar.png',
                                }}
                                resizeMode="contain"
                                style={avatar}
                            />
                        )}
                        <TouchableOpacity
                            style={iconCamera}
                            onPress={showImagePicker}
                        >
                            <Icon
                                type="feather"
                                name="camera"
                                size={22}
                                color={color.gray}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={infoView}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.textNormal}>Họ tên </Text>
                        <Text style={font.textBoldRed}>*</Text>
                    </View>
                    <TextInput
                        style={input}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.textNormal}>Giới tính </Text>
                        <Text style={font.textBoldRed}>*</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: itemWidth,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                onPress('Nam');
                            }}
                            //value={value}
                            style={[
                                styles.itemGioiTinh,
                                gender === 'Nam' && {
                                    borderColor: color.primary,
                                },
                            ]}
                        >
                            <Text style={font.textNormal}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onPress('Nữ');
                            }}
                            //value={value}
                            style={[
                                styles.itemGioiTinh,
                                gender === 'Nữ' && {
                                    borderColor: color.primary,
                                },
                            ]}
                        >
                            <Text style={font.textNormal}>Nữ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.textNormal}>Ngày sinh </Text>
                        <Text style={font.textBoldRed}>* </Text>
                    </View>
                    {/* <Text style={label}>{pickedImagePath }</Text> */}
                    <View style={styles.choosedateView}>
                        <Text>{`${
                            selectedDate
                                ? moment(selectedDate).format('DD-MM-YYYY')
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.textNormal}>Email </Text>
                        <Text style={font.textBoldRed}>*</Text>
                    </View>
                    <TextInput
                        style={input}
                        editable={false}
                        value={user.kh_email}
                        selectTextOnFocus={false}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.textNormal}>Số điện thoại </Text>
                        <Text style={font.textBoldRed}>*</Text>
                    </View>
                    <TextInput
                        style={input}
                        onChangeText={(text) => setNumber(text)}
                        value={number}
                        keyboardType="decimal-pad"
                        maxLength={10}
                    />

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.saveChangesButton}
                    >
                        <Text style={styles.textSaveChangeButton}>
                            Cập nhật
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
const { width } = Dimensions.get('window');
const itemWidth = width - 40;
const avatarsize = 120;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        backgroundColor: color.white,
        flex: 1,
        paddingHorizontal: 20,
    },
    avatarView: {
        width: itemWidth,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoView: {
        width: itemWidth,
    },
    itemGioiTinh: {
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
        backgroundColor: color.greylight,
        borderWidth: 1,
        borderColor: color.greylight,
        width: (itemWidth - 20) / 2,
        alignItems: 'center',
    },
    choosedateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: color.greylight,
        borderRadius: 15,
    },
    avatar: {
        width: avatarsize,
        height: avatarsize,
        borderRadius: avatarsize,
        resizeMode: 'cover',
        borderColor: color.white,
        borderWidth: 2,
    },
    iconCamera: {
        position: 'absolute',
        color: 'gray',
        bottom: 0,
        right: 20,
    },
    input: {
        paddingHorizontal: 10,
        // borderWidth: 2,
        // borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.greylight,
        // borderColor: color.primary,
        // borderBottomColor: color.primary,
        borderRadius: 15,
        height: 50,
    },
    saveChangesButton: {
        elevation: 8,
        backgroundColor: color.primary,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 30,
        width: width - 40,
    },
    textSaveChangeButton: {
        fontSize: 18,
        color: color.white,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    renderlabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 15,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
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
