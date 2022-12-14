import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NumericFormat } from 'react-number-format';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import Header from '../Header';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

export default function Favorite({ navigation }) {
    //const { user } = route.params;

    const [dataList, setDataList] = useState([]);

    const loadData = () => {
        AsyncStorage.getItem('favorite').then((list) => {
            if (list !== null) {
                const listF = JSON.parse(list);
                setDataList(listF);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, []);
    return (
        <View style={styles.container}>
            <Header title="Sản phẩm yêu thích" navigation={navigation} />
            <TouchableOpacity
                style={{ position: 'absolute', right: 20, top: 32 }}
                onPress={() => {
                    if (dataList.length !== 0) {
                        Alert.alert(
                            'Bỏ yêu thích tất cả sản phẩm?',
                            '',
                            [
                                { text: 'Trở về' },
                                {
                                    text: 'Xóa',
                                    onPress: () => {
                                        setDataList([]);
                                        AsyncStorage.removeItem('favorite');
                                    },
                                },
                            ]
                        );
                    }
                }}
            >
                <Icon
                    type="feather"
                    name="trash-2"
                    size={22}
                    color={color.white}
                />
            </TouchableOpacity>
            {
                dataList.length > 0 ? (
                    <ScrollView style={styles.wrapper}>
                    <View
                        style={{
                            flexWrap: 'wrap',
                            flex: 1,
                            paddingVertical: 10,
                            flexDirection: 'row',
                            paddingLeft: 20,
                        }}
                    >
                        {dataList
                        .sort(() => -1)
                        .map((item, i) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductDetail', {
                                        product: item.product,
                                    })
                                }
                                key={item.product.sp_ma}
                                style={styles.itemView}
                            >
                                <View style={styles.favProductImageView}>
                                    <Image
                                        resizeMode="contain"
                                        style={{ flex: 1 }}
                                        source={{ uri: `http://kimimylife.site/sp_hinhanh/${item.product.sp_hinhanh}` }}

                                    />
                                </View>
                                <View
                                    style={{
                                        marginTop: 0,
                                        width: itemW - 20
                                    }}
                                >
                                    <Text
                                        adjustsFontSizeToFit
                                        style={styles.favProductName}
                                    >
                                        {item.product.sp_ten}
                                    </Text>
                                    </View>
                                    <View style={styles.favProductPriceView}>
                                        <NumericFormat
                                            type="text"
                                            value={item.product.sp_giaban}
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            displayType="text"
                                            suffix={'đ'}
                                            renderText={(formatValue) => (
                                                <Text
                                                    style={styles.favProductPrice}
                                                >
                                                    {formatValue}
                                                </Text>
                                            )}
                                        />
                                        <TouchableOpacity
                                            style={{
                                              
                                            }}
                                            onPress={() =>
                                                Alert.alert(
                                                    // `Xóa ${item.product.sp_ten} khỏi giỏ hàng?`,
                                                    'Bỏ yêu thích sản phẩm này?',
                                                    '',
                                                    [
                                                        { text: 'Trở về' },
                                                        {
                                                            text: 'OK',
                                                            onPress: () => {
                                                                dataList.splice(i, 1);
                                                                AsyncStorage.setItem(
                                                                    'favorite',
                                                                    JSON.stringify(
                                                                        dataList
                                                                    )
                                                                ).then(() => {
                                                                    setDataList(
                                                                        dataList
                                                                    );
                                                                    loadData();
                                                                });
                                                            },
                                                        },
                                                    ]
                                                )
                                            }
                                        >
                                            {/* <Text>{item.state}</Text> */}
                                            <FAIcon
                                                name={
                                                    item.state ? 'heart' : 'heart-o'
                                                }
                                                size={18}
                                                color={
                                                    item.state
                                                        ? '#FD6C57'
                                                        : '#D8D8D8'
                                                }
                                            />
                                        </TouchableOpacity>
                                    </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* <Text>{JSON.stringify(dataList)}</Text> */}
                </ScrollView>
                ) : (
                    <View style={styles.wrapper}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={font.textTitle1}>Không có sản phẩm nào.</Text>
                        </View>
                    </View>
                )
            }
           
        </View>
    );
}

const { width } = Dimensions.get('window');
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
        elevation: 1,
    },
    favProductImageView: {
        flex: 1,
        height: 110,
        width: itemW - 11,
        paddingHorizontal: 12,
        borderRadius: 10,
        overflow: 'hidden',
    },
    favProductName: {
        fontFamily: 'SFProDisplaySemiBold',
        fontSize: 14,
        justifyContent: 'space-between',
    },
    favProductPriceView: {
        marginTop: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: itemW - 20
    },
    favProductPrice: {
        fontSize: 15,
        color: color.primary,
        fontFamily: 'SFProDisplaySemiBold',
    },
});
