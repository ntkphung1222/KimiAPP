import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import font from '../../../../../assets/font';
import getNewProduct from '../../../../api/getNewProduct';
import color from '../../../../../assets/color';
import newtag from '../../../../images/newtag.png';

export default function NewProduct({ navigation }) {
    const [serverData, setServerData] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        getNewProduct()
            .then((responseJson) => {
                //Successful response from the API Call
                setServerData(responseJson.results);
                //console.log(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <View style={{ paddingLeft: 20 }}>
                <Text style={font.textTitle1}> Sản phẩm mới nhất </Text>
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
                                    source={{
                                        uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                    }}
                                />

                                <Image
                                    source={newtag}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 0,
                                }}
                            >
                                <Text
                                    adjustsFontSizeToFit
                                    style={styles.newProductName}
                                >
                                    {item.sp_ten}
                                </Text>
                            </View>
                            <View style={styles.newProductPriceView}>
                                <NumericFormat
                                    type="text"
                                    value={item.sp_giaban}
                                    allowLeadingZeros
                                    thousandSeparator=","
                                    displayType="text"
                                    suffix={'đ'}
                                    renderText={(formatValue) => (
                                        <Text style={styles.newProductPrice}>
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
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const itemW = (width - 40) / 2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
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
        width: itemW - 5,
        paddingHorizontal: 10,
    },
    newProductPriceView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
        flexDirection: 'row',
        width: itemW - 5,
        paddingHorizontal: 10,
    },
    newProductPrice: {
        fontSize: 15,
        color: color.primary,
        fontFamily: 'SFProDisplaySemiBold',
    },
});
