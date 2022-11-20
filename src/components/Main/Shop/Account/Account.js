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
import {
    FontAwesome as FAIcon,
    FontAwesome5 as FAIcon5,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import userAvatar from '../../../../images/userAvatar.png';
import Signin from '../../../Authentication/Signin';
//import global from '../../../global';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';
import { onSignIn } from '../../../global';

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
        value: 'Địa chỉ giao hàng',
        iconname: 'location-pin',
        icontype: 'entypo',
        color: color.red,
    },

    {
        id: '4',
        value: 'Đổi mật khẩu',
        iconname: 'settings',
        icontype: 'feather',
        color: color.darkblue,
    },
    {
        id: '5',
        value: 'Đăng xuất',
        iconname: 'logout',
        icontype: 'materialicons',
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
        async function findUser() {
            await AsyncStorage.getItem('user').then((userR) => {
                if (userR !== null) {
                    const userCurrent = JSON.parse(userR);
                    setUser(userCurrent);
                    //console.log(onSignIn);
                } else {
                    // navigation.navigate('Signin');
                }
            });
        }
        findUser();
    }, []);
    const { container, avatarView, avatar, wrapper, optionView } = styles;
    const [listItems] = useState(optionArray);

    const logout = () => {
        AsyncStorage.removeItem('user');
        setUser([]);
        Alert.alert('Đăng xuất thành công!');
        navigation.navigate('Signin');
    };
    const gotoScreen = ($id) => {
        if ($id === '1') navigation.navigate('Info', { user });
        if ($id === '2') navigation.navigate('Order', { user });
        if ($id === '3') navigation.navigate('ShippingAddress', { user });
        if ($id === '4') navigation.navigate('ChangePassword', { user });
        if ($id === '5') logout();
        if ($id === '6') navigation.navigate('Chat');
        if ($id === '7') navigation.navigate('ModalMessage');
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
                    marginRight: 20,
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

            <Text style={font.textNormal}>{item.value}</Text>
        </TouchableOpacity>
    );
    const ItemSeparatorView = () => (
        //Item Separator
        <View
            style={{ height: 0.5, width: '100%', backgroundColor: color.line }}
        />
    );
    return (
        <View style={container}>
            <View style={styles.bigCircle} />
            <Header title={'Tài khoản'} navigation={navigation} />

            <View style={avatarView}>
                {user.kh_avatar !== null ? (
                    <Image
                        style={avatar}
                        resizeMode="contain"
                        source={{
                            uri: `http://kimimylife.site/kh_avatar/${user.kh_anhdaidien}`,
                        }}                    />
                ) : (
                    <Image
                        style={avatar}
                        resizeMode="contain"
                        source={userAvatar}
                    />
                )}
                <Text style={font.textNormal}>{user.kh_ten}</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    height: 60,
                }}
            >
                <TouchableOpacity
                    style={styles.action1}
                    onPress={() => navigation.navigate('MyRating', { user })}
                >
                    <FAIcon name="star" size={20} color={color.star} />
                    <Text style={font.textNormal}>Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.action2}
                    onPress={() => navigation.navigate('Favorite')}
                >
                    <FAIcon name="heart" size={20} color={color.like} />
                    <Text style={font.textNormal}>Yêu thích</Text>
                </TouchableOpacity>
            </View>
            <View style={wrapper}>
                <FlatList
                    data={listItems}
                    style={optionView}
                    //data defined in constructor
                    ItemSeparatorComponent={ItemSeparatorView}
                    //Item Separator View
                    renderItem={ItemView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
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
        width: 1200,
        height: 1200,
        backgroundColor: color.primary,
        borderRadius: 1200,
        position: 'absolute',
        top: -920,
        left: -400,
        right: -400,
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
    action1: {
        width: (width - 40) / 2,
        borderTopLeftRadius: 10,
        borderRightWidth: 1,
        borderRightColor: color.primary,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        elevation: 8,
    },
    action2: {
        width: (width - 40) / 2,
        borderLeftWidth: 1,
        borderLeftColor: color.primary,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        elevation: 8,
    },
    optionView: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: color.white,
        borderRadius: 20,
        elevation: 8,
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
