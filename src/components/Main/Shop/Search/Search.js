import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NumericFormat } from 'react-number-format';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function Search({ navigation }) {
    const [search, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [serverData, setServerData] = useState([10]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    function loadAllProduct() {
        fetch('http://kimimylife.site/api/allproduct')
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setServerData(responseJson.results);
                setMasterDataSource(responseJson.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async function loadSearchHistory() {
        AsyncStorage.getItem('searchhistory').then((s) => {
            if (s !== null) {
                const searc = JSON.parse(s);
                setSearchHistory(searc);
            }
        });
    }
    async function searchProduct(search){
        fetch(`http://kimimylife.site/api/searchproduct?keyword=${search}`)
        .then((response) => response.json())
        .then((res) => {
            if(res.success){
                setServerData(res.results);
            } else {
                Alert.alert('Không có sản phẩm nào');
            }  
        })
        .catch((error) => {
            console.error(error);
        });
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadAllProduct();
        setRefreshing(false);
    }, []);
    useEffect(() => {
        loadAllProduct();
        loadSearchHistory();
    }, []);
    async function onClickAddSearchHistory(pdName) {
        searchHistory.push(pdName);
        setSearchHistory(searchHistory);
        AsyncStorage.setItem(
            'searchhistory',
            JSON.stringify(searchHistory)
        ).then();
    }

    async function onClickAddCart(data) {
        const itemcart = {
            product: data,
            quantity: 1,
            // price: data.sp_giaban,
        };

        await AsyncStorage.getItem('cart')
            .then(async (datacart) => {
                if (datacart != null) {
                    const cart = JSON.parse(datacart);
                    const item = cart.find(
                        (c) => c.product.sp_ma === data.sp_ma
                    );
                    //console.log(item);
                    if (item) {
                        item.quantity += 1;
                        if (item.quantity > data.sp_soluonggioihan) {
                            item.quantity = data.sp_soluonggioihan;
                            Alert.alert(
                                'Bạn đã đạt số lượng mua giới hạn cho sản phẩm này.'
                            );
                        }
                        //else {
                        //item.quantity = item.product.sp_soluong;
                        //Alert.alert(
                        ('Bạn đã đạt số lượng mua giới hạn cho sản phẩm này.');
                        // );
                        //}
                    } else {
                        cart.push(itemcart);
                    }
                    await AsyncStorage.setItem(
                        'cart',
                        JSON.stringify(cart)
                    ).then();
                } else {
                    const cart = [];
                    cart.push(itemcart);
                    AsyncStorage.setItem('cart', JSON.stringify(cart)).then();
                }
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    const searchFilterFunction = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = masterDataSource.filter((item) => {
                // Applying filter for the inserted text in search bar
                const itemData = item.sp_mota
                    ? item.sp_mota.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setServerData(newData);
            setSearch(text);
        } else {
            setServerData(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.touchIconBack}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon
                        style={styles.headerIcon}
                        name="angle-left"
                        type="font-awesome"
                        size={35}
                        color={color.primary}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Tìm kiếm ở đây"
                    onChangeText={(text) => {
                        setSearch(text);
                        //searchFilterFunction(text);
                    }}
                    value={search}
                    onFocus={() => {
                        setIsHighlighted(true);
                    }}
                    //autoFocus
                    onBlur={() => setIsHighlighted(false)}
                    placeholderTextColor={color.text}
                    style={[
                        styles.inputSearch,
                        isHighlighted && styles.isHighlighted,
                    ]}
                    autoCapitalize={false}
                    keyboardType="default"
                    textContentType="none"
                />
                {search ? (
                    <TouchableOpacity
                        onPress={() => setSearch('')}
                        style={{ position: 'absolute', right: 110 }}
                    >
                        <Icon
                            style={styles.clearSearch}
                            type="antdesign"
                            name="close"
                            size={20}
                            color={color.primary}
                        />
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    style={{
                        backgroundColor: color.primary,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        //searchFilterFunction(search);
                        searchProduct(search);
                        onClickAddSearchHistory(search);
                    }}
                >
                    <Text style={font.textNormalWhite}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                {searchHistory.length > 0 ? (
                    <View>
                        <View style={styles.searchHistoryTitle}>
                            <Text style={styles.label}> Lịch sử tìm kiếm </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.removeItem('searchhistory');
                                    setSearchHistory([]);
                                }}
                            >
                                <Text>Xóa tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 20,
                                width,
                                flexWrap: 'wrap',
                            }}
                        >
                            {searchHistory
                                // .sort(() => -1)
                                .map((itemSH, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() =>
                                            searchFilterFunction(itemSH)
                                        }
                                        style={{
                                            backgroundColor: color.greylight,
                                            borderRadius: 10,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingVertical: 5,
                                            marginVertical: 3,
                                            height: 30,
                                            marginRight: 5,
                                        }}
                                    >
                                        <Text>{itemSH}</Text>
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                right: -5,
                                                top: -5,
                                            }}
                                            onPress={() => {
                                                searchHistory.splice(i, 1);
                                                AsyncStorage.setItem(
                                                    'searchhistory',
                                                    JSON.stringify(
                                                        searchHistory
                                                    )
                                                ).then(() => {
                                                    setSearchHistory(
                                                        searchHistory
                                                    );
                                                    loadSearchHistory();
                                                });
                                            }}
                                        >
                                            <Icon
                                                type="antdesign"
                                                name="closecircle"
                                                size={14}
                                                color={color.gray}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                ) : null}
                <View style={{ paddingLeft: 20 }}>
                    <Text style={font.textTitle1}> Tất cả sản phẩm </Text>
                </View>
                <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                >
                    {serverData
                        //.sort(() => -1)
                        .map((item, i) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductDetail', {
                                        product: item,
                                    })
                                }
                                style={styles.item}
                                key={i}
                            >
                                {item.sp_soluong === '0' ? (
                                    <View style={styles.leftItemView}>
                                        <Image
                                            style={styles.itemImage}
                                            resizeMode="contain"
                                            blurRadius={50}
                                            source={{
                                                uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                            }}
                                        />
                                        <View style={styles.hethangView}>
                                            <Text style={font.textBoldSmall}>
                                                Hết hàng
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.leftItemView}>
                                        <Image
                                            style={styles.itemImage}
                                            resizeMode="contain"
                                            source={{
                                                uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                            }}
                                        />
                                    </View>
                                )}

                                <View style={styles.rightItemView}>
                                    <View style={styles.rightTopView}>
                                        <Text style={font.textNormal}>
                                            {item.sp_ten}
                                        </Text>
                                    </View>
                                    <View style={styles.rightBottomView}>
                                        <NumericFormat
                                            type="text"
                                            value={item.sp_giaban}
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
                                        <TouchableOpacity
                                            onPress={() => {
                                                item.sp_soluong === '0'
                                                    ? Alert.alert(
                                                          'Sản phẩm đã hết hàng.'
                                                      )
                                                    : onClickAddCart(item);
                                            }}
                                            style={styles.btnAdd}
                                        >
                                            <Text
                                                style={font.textNormalPrimary}
                                            >
                                                THÊM VÀO GIỎ
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: color.backgroundColor,
        backgroundColor: color.white,
    },
    label: {
        fontSize: 18,
    },
    searchHistoryTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    item: {
        flex: 1,
        height: width * 0.3,
        flexDirection: 'row',
        width,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.greylight,
        //elevation: 0.5
    },
    leftItemView: {
        width: width * 0.3,
        justifyContent: 'center',
    },
    itemImage: {
        flex: 1,
        width: width * 0.25,
    },
    hethangView: {
        borderWidth: 2,
        borderColor: color.red,
        position: 'absolute',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    rightItemView: {
        width: width * 0.7,
        padding: 10,
        //backgroundColor: '#333',
    },
    rightTopView: {},
    rightBottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 20,
        left: 10,
    },
    btnAdd: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    header: {
        flexDirection: 'row',
        height: 50,
        marginTop: 22,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    touchIconBack: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        //backgroundColor: color.primary,
    },
    buttonSearch: {
        //width: 100,
        paddingHorizontal: 10,
        position: 'absolute',
        right: 20,
        height: 35,
        justifyContent: 'center',
        backgroundColor: color.primary,
        borderRadius: 15,
    },
    headerIcon: {
        marginRight: 0,
    },
    inputSearch: {
        width: '65%',
        height: 35,
        backgroundColor: color.white,
        borderRadius: 6,
        //marginHorizontal: 20,
        paddingHorizontal: 10,
        //paddingVertical: 5,
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular',
        color: color.text,
        borderColor: color.primary,
        borderWidth: 1,
    },
    isHighlighted: {
        borderColor: color.primary,
        borderWidth: 2,
    },
    wrapper: { backgroundColor: color.white, flex: 1 },
    itemText: {},
});
