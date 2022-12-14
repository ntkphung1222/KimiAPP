import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    //Dimensions,
    Image,
    RefreshControl,
    Alert,
    Dimensions,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { NumericFormat } from 'react-number-format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import order from '../../../../api/order';
//import momo from '../../../../images/momo.png';
import cod from '../../../../images/cod.png';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function Payment({ navigation, route }) {
    const { dataCart } = route.params;
    const { user } = route.params;
    const [value, setValue] = useState('first');
    const [dcmd, setDCMD] = useState([]);
    const [state, setState] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {
        imageIcon,
        radioButton,
        productView,
        productImage,
        productRightTop,
        productRightBottom,
        productRight,
    } = styles;
    const {
        container,
        wrapper,
        shippingAddressContainer,
        shippingAddress,
        paymentmethodContainer,
        paymentmethod,
    } = styles;
    const onLoadToTal = () => {
        let total = 0;
        const cart = dataCart;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].product.sp_giaban * cart[i].quantity;
        }
        return total;
    };
    const onLoadToTalQuan = () => {
        let total = 0;

        const cart = dataCart;
        for (let i = 0; i < cart.length; i++) {
            total += Number(cart[i].quantity);
        }
        return total;
    };
    function loadDCMD() {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/defaultAddress?dc_kh=${user.kh_ma}`)
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    setDCMD(res.results);
                    setState(false);
                } else {
                    setState(true);
                }
                //console.log(res.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadDCMD();
        setRefreshing(false);
    }, []);
    useEffect(() => {
        loadDCMD();
    }, []);
    //const soluong = onLoadToTalQuan();
    function handleSubmit() {
        //this.ref.form.submit();
        if (dcmd === []) {
            Alert.alert('Fail');
            return;
        }
        order(onLoadToTalQuan(), onLoadToTal(), dcmd[0].dc_ma, dataCart)
            .then((res) => {
                if (res.success) {
                    AsyncStorage.removeItem('cart');
                    navigation.navigate('Success');
                } else {
                    Alert.alert('Fail');
                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <View style={container}>
            <Header title="Kiểm tra" navigation={navigation} />
            <View style={{ flex: 0.78 }}>
                <ScrollView
                    style={wrapper}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={shippingAddressContainer}>
                        <Text style={font.textNormal}> Địa chỉ nhận hàng</Text>
                        <TouchableOpacity
                            style={shippingAddress}
                            onPress={() =>
                                navigation.navigate('ShippingAddress', { user })
                            }
                        >
                            <View
                                style={{
                                    width: width * 0.1,
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Icon
                                    name="location-pin"
                                    size={25}
                                    color={color.red}
                                />
                            </View>
                            <View style={{ width: width * 0.9, paddingRight: 5 }}>
                                {dcmd.length > 0 ? (
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={font.textNormal}>
                                                {dcmd[0].dc_nguoinhan.toString()}{' '}
                                                {' | '}{' '}
                                                {dcmd[0].dc_sdtnguoinhan.toString()}
                                            </Text>
                                        </View>
                                        <Text style={styles.dcctView}>
                                            {dcmd[0].dc_chitiet.toString()},{' '}
                                            {dcmd[0].xptt_ten.toString()},{' '}
                                            {dcmd[0].qh_ten.toString()},{' '}
                                            {dcmd[0].ttp_ten.toString()}
                                        </Text>
                                    </View>
                                ) : (
                                    <View>
                                        <Text style={font.textNormal}>
                                            Vui lòng nhập địa chỉ nhận hàng.
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={font.textNormal}>Danh sách sản phẩm</Text>
                    {dataCart.map((item) => (
                        <View key={item.product.sp_ma} style={productView}>
                            <View style={styles.productImageView}>
                                <Image
                                    style={productImage}
                                    resizeMode="contain"
                                    source={{
                                        uri: `http://kimimylife.site/sp_hinhanh/${item.product.sp_hinhanh}`,
                                    }}
                                />
                            </View>
                            <View style={productRight}>
                                <View style={productRightTop}>
                                    <Text style={font.textNormal}>
                                        {item.product.sp_ten}
                                    </Text>
                                </View>
                                <View style={productRightBottom}>
                                    <NumericFormat
                                        type="text"
                                        value={item.product.sp_giaban}
                                        allowLeadingZeros
                                        thousandSeparator=","
                                        displayType="text"
                                        //prefix="Giá: "
                                        suffix={'đ'}
                                        renderText={(formatValue) => (
                                            <Text style={font.textBold}>
                                                {formatValue}
                                            </Text>
                                        )}
                                    />
                                    <Text style={font.textBold}>
                                        x {item.quantity}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View style={styles.subtotalView}>
                        <Text style={font.textBold}>
                            Tổng tiền (Đã bao gồm thuế) -
                        </Text>
                        <NumericFormat
                            type="text"
                            value={onLoadToTal()}
                            allowLeadingZeros
                            thousandSeparator=","
                            displayType="text"
                            suffix={'đ'}
                            renderText={(formatValue) => (
                                <Text style={font.textBoldPrimary}>
                                    {formatValue}
                                </Text>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    flex: 0.22,
                    elevation: 18,
                    paddingHorizontal: 20,
                    borderColor: color.borderSecond,
                    borderWidth: 1,
                    backgroundColor: color.white,
                }}
            >
                <RadioButton.Group
                    onValueChange={(newValue) => setValue(newValue)}
                    value={value}
                >
                    <View style={paymentmethodContainer}>
                        <Text style={font.textNormal}>
                            {' '}
                            Chọn phương thức thanh toán
                        </Text>
                        <TouchableOpacity style={paymentmethod}>
                            <Image source={cod} style={imageIcon} />
                            <Text style={font.textNormal}>
                                Thanh toán khi nhận hàng
                            </Text>
                            <RadioButton value="first" style={radioButton} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={paymentmethodContainer}> */}
                    {/* <TouchableOpacity style={paymentmethod}>
                        <Image source={momo} style={imageIcon} />
                        <Text style={font.textNormal}>Ví điện tử MoMo</Text>
                        <RadioButton value="second" style={radioButton} />
                    </TouchableOpacity>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 41,
                            left: 40,
                            backgroundColor: 'white',
                        }}
                    >
                        <Text style={font.textNormalSmall}>
                            Đang phát triển
                        </Text>
                    </View> */}
                    {/* </View> */}
                </RadioButton.Group>
                <TouchableOpacity
                    disabled={state}
                    style={styles.checkoutButton}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');
const itemW = width - 40;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    header: {
        flexDirection: 'row',
        height: 50,
        marginTop: 22,
        alignItems: 'flex-start',
        backgroundColor: color.primary,
    },
    headerIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        color: color.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    shippingAddressContainer: {
        //height: 100,
    },
    label: {
        fontSize: 16,
        margin: 5,
    },
    shippingAddress: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 6,
        paddingVertical: 10,
    },
    dcctView: {
        width: width * 0.8,
        fontFamily: 'SFProDisPlayRegular',
        fontSize: 16,
        color: color.darkblue,
    },
    subtotalView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    subtotalText: {
        fontSize: 18,
        fontWeight: '500',
    },
    subtotalPrice: {
        fontSize: 18,
        fontWeight: '300',
    },
    paymentmethodContainer: {},
    paymentmethod: {
        borderColor: color.borderSecond,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        justifyContent: 'space-between',
        //alignContent: 'center',
    },
    imageIcon: {
        width: 35,
        height: 35,
        // alignItems: 'flex-end'
    },
    productView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.greylight,
    },
    productImageView: {},
    productImage: {
        width: itemW * 0.3,
        height: itemW * 0.3,
    },
    productRight: { width: itemW * 0.7 },
    productRightTop: {
        height: 70,
    },
    productRightBottom: {
        flexDirection: 'row',
        width: itemW * 0.7,
        height: 30,
        justifyContent: 'space-between',
    },
    paymentViewFooter: {
        flex: 0.3,
        backgroundColor: color.white,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 0,
    },
    checkoutButton: {
        elevation: 8,
        backgroundColor: color.primary,
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 10,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 18,
        color: color.white,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});
