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
import moment from 'moment';
import Header from '../Header';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';
//import color from '../../../../../assets/color';

export default function ChangeInfo({ navigation, route }) {
    const title = 'Thông tin cá nhân';
    const label = font.label;
    const { user } = route.params;
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
                    {user.kh_anhdaidien !== null ? (
                        <Image
                            style={avatar}
                            resizeMode="contain"
                            source={{
                                uri: `http://kimimylife.site/kh_avatar/${user.kh_anhdaidien}`,
                            }}
                        />
                    ) : (
                        <Image
                            style={avatar}
                            resizeMode="contain"
                            source={{
                                uri: 'http://kimimylife.site/kh_avatar/userAvatar.png',
                            }}
                        />
                    )}
                    <Text style={font.textNormal}>{user.kh_ten}</Text>
                </View>
                <View style={infoView}>
                    <Text style={font.textBold}>Thông tin cá nhân</Text>

                    <View style={rowView}>
                        <View style={labelView}>
                            <Text style={label}>Giới tính</Text>
                        </View>
                        <View style={textView}>
                            {user.kh_gioitinh === null ? (
                                <Text style={label}>Chưa cập nhật</Text>
                            ) : (
                                <Text style={label}>{user.kh_gioitinh}</Text>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            height: 0.5,
                            width: '100%',
                            backgroundColor: color.line,
                        }}
                    />

                    <View style={rowView}>
                        <View style={labelView}>
                            <Text style={label}>Ngày sinh</Text>
                        </View>
                        <View style={textView}>
                            {user.kh_ngaysinh === null ? (
                                <Text style={label}>Chưa cập nhật</Text>
                            ) : (
                                <Text style={label}>
                                    {moment(user.kh_ngaysinh).format(
                                        'DD-MM-YYYY'
                                    )}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            height: 0.5,
                            width: '100%',
                            backgroundColor: color.line,
                        }}
                    />

                    <View style={rowView}>
                        <View style={labelView}>
                            <Text style={label}>Số điện thoại</Text>
                        </View>
                        <View style={textView}>
                            <Text style={label}>{user.kh_sodienthoai}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 0.5,
                            width: '100%',
                            backgroundColor: color.line,
                        }}
                    />

                    <View style={rowView}>
                        <View style={labelView}>
                            <Text style={label}>Email</Text>
                        </View>
                        <View style={textView}>
                            <Text style={label}>{user.kh_email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={textChangeInfo}
                        onPress={() =>
                            navigation.navigate('ChangeInfo', { user })
                        }
                    >
                        <Icon
                            style={iconChange}
                            type="antdesign"
                            name="edit"
                            size={20}
                        />
                        <Text style={font.textBold}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: color.backgroundColor,
        flex: 1,
    },
    avatarView: {
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
        borderColor: color.white,
        borderWidth: 2,
    },
    infoView: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: color.white,
    },
    rowView: {
        flexDirection: 'row',
        width: itemWidth,
        alignItems: 'center',
        height: 40,
    },
    labelView: {
        width: itemWidth * 0.25,
    },
    textView: {
        width: itemWidth * 0.75,
        marginLeft: 10,
    },
    textChangeInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.greylight,
        borderRadius: 20,
        marginTop: 10,
    },
    iconChange: {
        marginRight: 2,
    },
});
