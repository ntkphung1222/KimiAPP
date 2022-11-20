/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import Header from '../Header';

const numColumns = 2;
//const title = 'Sản phẩm';

export default function Products({ navigation, route }) {
    const { dm_ma, dm_ten } = route.params.cate;
    const { container, wrapper } = styles;
    const [serverData, setServerData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [isFocus, setIsFocus] = useState('Mới nhất');
    const onPress = (string) => {
        setIsFocus(string);
    };
    async function loadProduct(state) {
        fetch(
            `http://kimimylife.site/api/product?category=${dm_ma}&state=${state}`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setServerData(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const wait = (timeout) =>
        // Defined the timeout function for testing purpose
        new Promise((resolve) => setTimeout(resolve, timeout));
    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        wait(2000).then(() => setIsRefreshing(false));
    }, []);
    useEffect(() => {
        loadProduct(0);
    }, []);
    return (
        <View style={container}>
            <Header navigation={navigation} title={dm_ten} />
            <View style={wrapper}>
                <View style={styles.filterView}>
                    <TouchableOpacity
                        style={[
                            styles.filter,
                            isFocus === 'Mới nhất' && styles.changeBg,
                        ]}
                        onPress={() => {
                            loadProduct(0);
                            onPress('Mới nhất');
                        }}
                    >
                        <Text
                            style={[
                                font.label,
                                (isFocus === 'Mới nhất' && styles.changeText),
                            ]}
                        >
                            Mới nhất
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            loadProduct(1);
                            onPress('Bán chạy');
                        }}
                        style={[
                            styles.filter,
                            isFocus === 'Bán chạy' && styles.changeBg,
                        ]}
                    >
                        <Text style={[
                                font.label,
                                (isFocus === 'Bán chạy' && styles.changeText),
                            ]}>Bán chạy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            loadProduct(2);
                            onPress('Giá cao');
                        }}
                        style={[
                            styles.filter,
                            isFocus === 'Giá cao' && styles.changeBg,
                        ]}
                    >
                        <Text style={[
                                font.label,
                                (isFocus === 'Giá cao' && styles.changeText),
                            ]}>Giá cao</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            loadProduct(3);
                            onPress('Giá thấp')
                        }}
                        style={[
                            styles.filter,
                            isFocus === 'Giá thấp' && styles.changeBg,
                        ]}
                    >
                        <Text style={[
                                font.label,
                                (isFocus === 'Giá thấp' && styles.changeText),
                            ]}>Giá thấp</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={styles.newProductView}>
                        {/* <Text>{JSON.stringify(serverData)}</Text> */}
                        {serverData.map((item) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductDetail', {
                                        product: item,
                                    })
                                }
                                key={item.sp_ma}
                                style={styles.itemView}
                            >
                                <View style={styles.newProductImageView}>
                                    <Image
                                        resizeMode="contain"
                                        style={{ flex: 1 }}
                                        source={{ uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}` }}

                                    />
                                </View>
                                <View
                                    style={{
                                        marginTop: 0,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                    }}
                                >
                                    <Text
                                        adjustsFontSizeToFit
                                        style={styles.newProductName}
                                    >
                                        {item.sp_ten}
                                    </Text>
                                    <View style={styles.newProductPriceView}>
                                        <NumericFormat
                                            type="text"
                                            value={item.sp_giaban}
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            displayType="text"
                                            suffix={'đ'}
                                            renderText={(formatValue) => (
                                                <Text
                                                    style={
                                                        styles.newProductPrice
                                                    }
                                                >
                                                    {formatValue}
                                                </Text>
                                            )}
                                        />
                                        <View>
                                            <Text style={font.textNormalSmall}>
                                                Đã bán {item.sp_daban}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2;
const itemFilter = (width - 40 - 15) / 4;
const itemW = (width - 40) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    filterView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    filter: {
        backgroundColor: color.borderSecond,
        width: itemFilter,
        marginRight: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    changeBg: {
        backgroundColor: 'gray',
        color: 'white',
    },
    changeText: {
        color: 'white',
    },
    newProductView: {
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
    },
    itemView: {
        width: itemW - 5,
        marginRight: 10,
        marginBottom: 10,
        borderColor: color.greylight,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 7,
        backgroundColor: color.white,
        alignItems: 'center',
        elevation: 8,
    },
    newProductImageView: {
        flex: 1,
        height: 110,
        width: itemW - 11,
        paddingHorizontal: 12,
        borderRadius: 10,
        overflow: 'hidden',
    },
    newProductName: {
        fontFamily: 'SFProDisplaySemiBold',
        fontSize: 14,
        justifyContent: 'space-between',
    },
    newProductPriceView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
        flexDirection: 'row',
    },
    newProductPrice: {
        fontSize: 15,
        color: color.primary,
        fontFamily: 'SFProDisplaySemiBold',
    },
});
