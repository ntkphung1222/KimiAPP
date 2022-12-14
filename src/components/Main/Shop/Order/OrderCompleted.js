/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
    Dimensions,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderCompleted({ navigation, route }) {
    try {
        const { user } = route.params;
        const [serverData, setServerData] = useState({});
        const [refreshing, setRefreshing] = useState(false);
        
        async function loadData(){
            fetch(`http://kimimylife.site/api/orderhistory?hdx_kh=${user.kh_ma}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    //Successful response from the API Call
                    setServerData(responseJson.results);
                    // setServerDataToAccept(Object.entries(serverData));
                })
                .then(() => {})
                .catch((error) => {
                    console.error(error);
                });
        }
        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            loadData();
            setRefreshing(false);
        }, []);
        useEffect(() => {
            loadData();
        }, []);
        const arr = Object.values(serverData).filter(
            (f) => f.trangthai === '2' || f.trangthai === '3'
        );
        return (
            <View style={{ flex: 1 }}>
                {Object.keys(arr).length > 0 ? (
                    <ScrollView
                        style={styles.container}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {/* <Text>{JSON.stringify(arr)}</Text> */}
                        {Object.entries(arr)
                            //.sort(() => -1)
                            .map(([i, value]) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('OrderDetail', {
                                            productList: value.data,
                                            userID: user.kh_ma,
                                        })
                                    }
                                    key={i}
                                    style={{
                                        marginBottom: 10,
                                        paddingBottom: 80,
                                        backgroundColor: color.white,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingVertical: 2,
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: color.greylight,
                                            width,
                                        }}
                                    >
                                        <Text style={font.textNormal}>Mã đơn hàng</Text>
                                        <Text
                                           style={font.textNormalItalic}
                                        >
                                            {value.hdx_ma}
                                        </Text>
                                    </View>
                                    {/* <Text>console.log{JSON.stringify(serverData)}</Text> */}
                                    {value.data.map((data) => (
                                        <View
                                            key={data.hdxct_ma}
                                            style={styles.itemStyle}
                                        >
                                            <View style={styles.itemImageStyle}>
                                                <Image
                                                    style={styles.itemImage}
                                                    resizeMode="contain"
                                                    source={{ uri: `http://kimimylife.site/sp_hinhanh/${data.sp_hinhanh}` }}

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
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <NumericFormat
                                                        type="text"
                                                        value={data.sp_giaban}
                                                        allowLeadingZeros
                                                        thousandSeparator=","
                                                        displayType="text"
                                                        suffix={'đ'}
                                                        renderText={(
                                                            formatValue
                                                        ) => (
                                                            <Text style={font.textBold}>
                                                                {formatValue}
                                                            </Text>
                                                        )}
                                                    />
                                                    <Text style={font.textBold}>
                                                        x {data.soluong}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 40,
                                            right: 20,
                                            borderRadius: 10,
                                            borderColor: color.primary,
                                            borderWidth: 1,
                                            paddingHorizontal: 10,
                                            paddingVertical: 2,
                                        }}
                                    >
                                        <Text style={font.textNormalItalic}>
                                            Đã giao
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 5,
                                            right: 20,
                                            left: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={font.textNormal}>
                                            {value.soluong} sản phẩm
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Text style={font.textNormal}>
                                                Thành tiền :
                                            </Text>
                                            <NumericFormat
                                                type="text"
                                                value={value.thanhtien}
                                                allowLeadingZeros
                                                thousandSeparator=","
                                                displayType="text"
                                                suffix={'đ'}
                                                renderText={(formatValue) => (
                                                    <Text
                                                    style={font.textBoldPrimary}
                                                    >
                                                        {formatValue}
                                                    </Text>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                ) : (
                    <View style={styles.emptyView}>
                        <Text style={font.textTitle1}>
                            Bạn chưa có đơn hàng nào.
                        </Text>
                    </View>
                )}
            </View>
        );
    } catch (ex) {
        console.log(ex);
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    itemStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: color.borderSecond,
        width,
        padding: 10,
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
        alignItems: 'center',

    },
});
