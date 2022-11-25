/* eslint-disable no-nested-ternary */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import Header from '../Header';
import cancleOrder from '../../../../api/cancleOrder';
import confirmOrder from '../../../../api/confirmOrder';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderDetail({ navigation, route }) {
    const { productList } = route.params;
    const userID = route.params.userID;

    // eslint-disable-next-line camelcase
    function handleSubmit(hdx_ma) {
        // eslint-disable-next-line no-undef
        cancleOrder(hdx_ma).then((res) => {
            if (res.success) {
                Alert.alert('Hủy đơn hàng thành công.');
            } else {
                Alert.alert('Thao tác thất bại.');
            }
        });
    }

    // eslint-disable-next-line camelcase
    function daNhanHang(hdx_ma) {
        // eslint-disable-next-line no-undef
        confirmOrder(hdx_ma).then((res) => {
            if (res.success) {
                console.log(res.message);
            }
        });
    }

    return (
        <View>
            <Header title={'Chi tiết đơn hàng'} navigation={navigation} />

            <ScrollView
                style={styles.wrapper}
                showsVerticalScrollIndicator={false}
            >
                {productList.map((data, i) => (
                    <View key={data.hdxct_ma} style={styles.itemStyle}>
                        <View style={styles.itemImageStyle}>
                            <Image
                                style={styles.itemImage}
                                resizeMode="contain"
                                source={{
                                    uri: `http://kimimylife.site/sp_hinhanh/${data.sp_hinhanh}`,
                                }}
                            />
                        </View>
                        <View style={styles.orderInfo}>
                            <Text style={font.textNormal}>{data.sp_ten}</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    paddingHorizontal: 10,
                                    width: width * 0.7,
                                    //backgroundColor: '#333',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <NumericFormat
                                        type="text"
                                        value={data.dongia}
                                        allowLeadingZeros
                                        thousandSeparator=","
                                        displayType="text"
                                        suffix={'đ'}
                                        renderText={(formatValue) => (
                                            <Text style={font.textBold}>
                                                {formatValue}
                                            </Text>
                                        )}
                                    />
                                    <Text style={font.textBold}>
                                        {' '}
                                        x {data.soluong}
                                    </Text>
                                </View>
                                {productList[0].hdx_trangthai === '2' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // Alert.alert('ok');
                                            navigation.navigate(
                                                'RatingProduct',
                                                {
                                                    product: productList[i],
                                                    userID,
                                                }
                                            );
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textDecorationLine: 'underline',
                                            }}
                                        >
                                            Đánh giá
                                        </Text>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                    </View>
                ))}
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    {productList[0].hdx_trangthai === '0' ? (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 15,
                                right: 20,
                                borderRadius: 15,
                                backgroundColor: color.red,
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                            }}
                            onPress={() => {
                                Alert.alert('Xác nhận muốn hủy đơn hàng?', '', [
                                    { text: 'Trở về' },
                                    {
                                        text: 'Xác nhận',
                                        onPress: () => {
                                            handleSubmit(productList[0].hdx_ma);
                                        },
                                    },
                                ]);
                            }}
                        >
                            <Text style={{ color: color.white }}>Hủy</Text>
                        </TouchableOpacity>
                    ) : productList[0].hdx_trangthai === '1' ? (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 15,
                                right: 20,
                                borderRadius: 15,
                                backgroundColor: 'green',
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                            }}
                            onPress={() => {
                                Alert.alert('Xác nhận đã nhận hàng?', '', [
                                    { text: 'Trở về' },
                                    {
                                        text: 'Xác nhận',
                                        onPress: () => {
                                            daNhanHang(productList[0].hdx_ma);
                                        },
                                    },
                                ]);
                            }}
                        >
                            <Text style={{ color: color.white }}>Đã nhận</Text>
                        </TouchableOpacity>
                    ) : (
                        <View
                            style={{
                                position: 'absolute',
                                top: 15,
                                right: 20,
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor:
                                    productList[0].hdx_trangthai === '-1'
                                        ? color.red
                                        : color.primary,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                            }}
                        >
                            <Text style={font.textNormalItalic}>
                                {productList[0].hdx_trangthai === '-1'
                                    ? 'Đã hủy'
                                    : productList[0].hdx_trangthai === '1'
                                    ? 'Đã nhận hàng'
                                    : 'Đã giao'}
                            </Text>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                            marginTop: 40,
                        }}
                    >
                        <Text style={font.textNormal}>Mã đơn hàng:</Text>
                        <Text style={font.textNormal}>
                            {productList[0].hdx_ma}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                        }}
                    >
                        <Text style={font.textNormal}>Thời gian đặt hàng:</Text>
                        <Text style={font.textNormal}>
                            {productList[0].created_at}
                        </Text>
                    </View>
                    <View
                        style={{
                            //paddingHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={font.textNormal}>
                            {productList[0].hdx_soluong} sản phẩm
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={font.textNormal}>
                                Thành tiền : {'  '}
                            </Text>

                            <NumericFormat
                                type="text"
                                value={productList[0].hdx_tongtien}
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
                    </View>
                </View>
                {/* <Text>{JSON.stringify(productList[0])} </Text> */}
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    wrapper: {
        backgroundColor: color.white,
    },
    itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: color.borderSecond,
        width,
        padding: 10,
        //paddingBottom: 30,
    },
    itemImageStyle: {
        width: width * 0.25,
    },
    itemImage: {
        width: 90,
        height: 90,
        elevation: 1,
        borderRadius: 8,
    },
    orderInfo: {
        paddingHorizontal: 10,
        width: width * 0.73,
        height: 90,
    },
    emptyView: {
        flex: 1,
        marginTop: 140,
    },
});
