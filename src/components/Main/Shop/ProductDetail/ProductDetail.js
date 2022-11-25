/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    RefreshControl,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';
import userAvatar from '../../../../images/userAvatar.png';
import dgTB from '../../../../api/dgTB';
import color from '../../../../../assets/color';
import Header from '../Header';
import font from '../../../../../assets/font';

export default function ProductDetail({ navigation, route }) {
    const { product } = route.params;
    const [serverData, setServerData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [quan, setQuan] = useState(1);
    const [count, setCount] = useState(0);
    const [dgtb, setDGTB] = useState(0);
    const [tcdg, setTCDG] = useState([]);
    const [dght, setDGHT] = useState([]);
    const [hethang, setHetHang] = useState(false);
    const scrollRef = useRef();

    const goToTop = () => {
        scrollRef.current
            ? scrollRef.current.scrollTo({
                  y: 0,
                  animated: true,
              })
            : setTimeout(onPressTouch, 50);
    };

    const title = 'Chi tiết sản phẩm';
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadCart();
        setRefreshing(false);
    }, []);
    const { container, wrapper, imageView, itemImage } = styles;
    const [productDescription] = useState(
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.'
    );
    const [isFavourite, setFavourite] = useState(false);
    const [seeFullDescription, setSeeFullDescription] = useState(false);

    async function loadCart() {
        await AsyncStorage.getItem('cart').then(async (cart) => {
            if (cart !== null) {
                const cartS = JSON.parse(cart);
                setCount(cartS.length);
            }
        });
    }
    async function loadDGTB(sp_ma) {
        dgTB(sp_ma)
            .then((res) => {
                setDGTB(res.results);
            })
            .catch((error) => console.log(error));
    }
    async function loadAllDG() {
        fetch(`http://kimimylife.site/api/getAllDG?sp_ma=${product.sp_ma}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setTCDG(responseJson.results);
                if (tcdg.length > 3) setDGHT(tcdg.slice(0, 3));
            })
            .catch((error) => {
                console.error(error);
            });
    }
    async function loadSPCungDM() {
        fetch(
            `http://kimimylife.site/api/productsamecate?category=${product.dm_ma}&sp_ma=${product.sp_ma}`
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
    async function loadSPYT(sp_ma) {
        await AsyncStorage.getItem('favorite').then(async (fav) => {
            if (fav !== null) {
                const spFAV = JSON.parse(fav);
                //setSPFAV(spFAV);
                const newData = spFAV
                    .map((i) => i.product.sp_ma)
                    .indexOf(sp_ma);
                if (newData > -1) {
                    setFavourite(true);
                } else {
                    setFavourite(false);
                }
            }
        });
    }
    const onSuccess = () => {
        Alert.alert(
            'Đã thêm sản phẩm vào giỏ hàng.',
            '',
            [
                {
                    text: 'Đi đến giỏ hàng',
                    onPress: () => navigation.navigate('Cart'),  
                },
                {
                    text: 'OK',
                }
            ],
            
        );
    };
    useEffect(() => {
        loadCart();
        loadDGTB(product.sp_ma);
        loadAllDG();
        loadSPCungDM();
        loadSPYT(product.sp_ma);
    }, [product.sp_ma]);

    async function onClickAddCart(data) {
        const itemcart = {
            product: data,
            quantity: quan,
        };
        await AsyncStorage.getItem('cart')
            .then(async (datacart) => {
                if (datacart != null) {
                    const cart = JSON.parse(datacart);
                    const item = cart.find(
                        (c) => c.product.sp_ma === data.sp_ma
                    );
                    if (item) {
                        item.quantity += quan;
                        //if (item.sp_soluong > item.product.sp_soluonggioihan){
                            if (
                                item.quantity > item.product.sp_soluonggioihan
                            ) {
                                item.quantity = item.product.sp_soluonggioihan;
                                Alert.alert(
                                    'Bạn đã đạt số lượng mua giới hạn cho sản phẩm này.'
                                );
                            } 
                            //else {
                                //item.quantity = item.product.sp_soluong;
                                //Alert.alert(
                                  //  'Bạn đã đạt số lượng mua giới hạn cho sản phẩm này.'
                               // );
                           // }
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
                    await AsyncStorage.setItem(
                        'cart',
                        JSON.stringify(cart)
                    ).then();
                }
                //onSuccess();
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    const onClickAddFavorite = (data) => {
        const itemfav = {
            product: data,
            state: true,
        };

        AsyncStorage.getItem('favorite')
            .then((datafav) => {
                if (datafav != null) {
                    const list = JSON.parse(datafav);
                    const newData = list
                        .map((i) => i.product.sp_ma)
                        .indexOf(data.sp_ma);
                    if (newData > -1) {
                        list.splice(newData, 1);
                    } else {
                        list.push(itemfav);
                    }

                    AsyncStorage.setItem(
                        'favorite',
                        JSON.stringify(list)
                    ).then();
                } else {
                    const list = [];
                    list.push(itemfav);
                    AsyncStorage.setItem(
                        'favorite',
                        JSON.stringify(list)
                    ).then();
                }
                //Alert.alert('Add thành công');
            })
            .catch((error) => {
                Alert.alert(error);
            });
    };
    return (
        <View style={container}>
            <Header navigation={navigation} title={title} />
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 30,
                }}
                onPress={() => {
                    navigation.navigate('Cart');
                }}
            >
                <Badge
                    style={{}}
                    status="error"
                    value={count}
                    containerStyle={{
                        position: 'absolute',
                        top: -10,
                        left: 16,
                    }}
                />
                <Icon
                    type="feather"
                    name="shopping-cart"
                    color={color.white}
                    size={25}
                />
            </TouchableOpacity>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ref={scrollRef}
                style={wrapper}
                showsVerticalScrollIndicator={false}
            >
                 {product.sp_soluong === '0' ? (
                <View style={imageView}>
                    <Image
                        style={itemImage}
                        blurRadius={50}
                        resizeMode="contain"
                        source={{
                            uri: `http://kimimylife.site/sp_hinhanh/${product.sp_hinhanh}`,
                        }}
                    />
                   
                        <View style={{ position: 'absolute', top: 70 }}>
                        <Text style={font.textTitle1}>Sản phẩm đã hết hàng</Text>
                        </View>
                </View>  ) : (
                    <View style={imageView}>
                    <Image
                        style={itemImage}
                        resizeMode="contain"
                        source={{
                            uri: `http://kimimylife.site/sp_hinhanh/${product.sp_hinhanh}`,
                        }}
                    />
                    </View>
                )}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 20,
                    }}
                    onPress={() => {
                        setFavourite(!isFavourite);
                        onClickAddFavorite(product);
                    }}
                >
                    <FAIcon
                        name={isFavourite ? 'heart' : 'heart-o'}
                        size={22}
                        color={isFavourite ? '#FD6C57' : '#D8D8D8'}
                    />
                </TouchableOpacity>
                <Text style={font.productNameLarge}>{product.sp_ten}</Text>
                <View style={styles.productPriceView}>
                    <View style={{ flexDirection: 'row' }}>
                        <NumericFormat
                            type="text"
                            value={product.sp_giaban}
                            allowLeadingZeros
                            thousandSeparator=","
                            displayType="text"
                            suffix={'đ'}
                            renderText={(formatValue) => (
                                <Text style={styles.discountedPriceText}>
                                    {formatValue}
                                </Text>
                            )}
                        />
                        <NumericFormat
                            type="text"
                            value={40000}
                            allowLeadingZeros
                            thousandSeparator=","
                            displayType="text"
                            suffix={'đ'}
                            renderText={(formatValue) => (
                                <Text style={styles.actualPriceText}>
                                    {formatValue}
                                </Text>
                            )}
                        />
                    </View>

                    <Text style={font.textNormal}>
                        Đã bán {product.sp_daban}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            style={{ marginLeft: 0, marginRight: 5 }}
                            imageSize={20}
                            fractions={1}
                            startingValue={dgtb}
                            readonly
                        />
                        {dgtb === 0 ? (
                            <Text style={font.textNormal}>
                                Chưa có đánh giá
                            </Text>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 10 }}>{dgtb}</Text>
                                <Text>({tcdg.length} lượt đánh giá)</Text>
                            </View>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                if (quan > 1) {
                                    setQuan(quan - 1);
                                }
                            }}
                        >
                            <FAIcon
                                style={styles.toggleCounterButton}
                                name="minus-circle"
                                color={color.greylight}
                                size={25}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                width: 30,
                                textAlign: 'center',
                                marginHorizontal: 12,
                                fontFamily: 'SFProDisPlayRegular',
                                fontSize: 22,
                            }}
                        >
                            {quan}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (quan < product.sp_soluonggioihan)
                                    setQuan(quan + 1);
                            }}
                        >
                            <FAIcon
                                style={styles.toggleCounterButton}
                                name="plus-circle"
                                color={color.primary}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() => {
                            product.sp_soluong === '0'
                                ? Alert.alert('Sản phẩm đã hết hàng.')
                                : onClickAddCart(product);
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <Text style={font.textButtonWhite}>Thêm vào giỏ</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={font.textNormalItalic}>
                        *Số lượng tối đa cho một lần mua là{' '}
                        {product.sp_soluonggioihan} sản phẩm
                    </Text>
                </View>
                <View style={{ marginTop: 10, backgroundColor: color.white }}>
                    <TouchableOpacity
                        style={styles.productDescriptionHeader}
                        onPress={() => setSeeFullDescription((prev) => !prev)}
                    >
                        <Text
                            style={{
                                fontFamily: 'SFProDisplaySemiBold',
                                fontSize: 18,
                            }}
                        >
                            Mô tả sản phẩm
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                setSeeFullDescription((prev) => !prev)
                            }
                        >
                            {seeFullDescription ? (
                                <Icon name="chevron-up" size={26} />
                            ) : (
                                <Icon name="chevron-down" size={26} />
                            )}
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={{ padding: 10 }}>
                        <Text style={font.textNormal}>
                            {seeFullDescription
                                ? `${product.sp_mota}`
                                : `${product.sp_mota.split('.')[3]}`}
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingView}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'SFProDisPlayRegular',
                                fontSize: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            Đánh giá
                        </Text>
                    </View>
                    {
                    tcdg.length > 0 ? (
                        <View>
                            {tcdg.map((itemDG, i) => (
                                <View key={i} style={styles.itemRatingView}>
                                    <View style={styles.leftView}>
                                        <Image
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 30,
                                            }}
                                            source={userAvatar}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.rightView}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Text style={styles.userName}>
                                                {itemDG.kh_ten}
                                            </Text>
                                            <Text>
                                                {/* {moment(
                                                    new Date(itemDG.dg_ngay)
                                                ).format('DD/MM/YYYY')} */}
                                                {itemDG.dg_ngay}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: 'flex-start',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <AirbnbRating
                                                size={15}
                                                starContainerStyle={{
                                                    marginRight: 0,
                                                }}
                                                isDisabled
                                                showRating={false}
                                                defaultRating={itemDG.dg_sao}
                                            />
                                        </View>
                                        <Text style={font.textNormal}>
                                            {itemDG.dg_noidung !== null
                                                ? itemDG.dg_noidung
                                                : 'Không chứa nội dung.'}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View>
                            <Text style={font.textNormal}>
                                Chưa có đánh giá.
                            </Text>
                        </View>
                    )}
                </View>
                {
                    serverData.length > 0 ? (
                        <View style={{ marginTop: 10 }}>
                        <Text
                            style={{
                                fontFamily: 'SFProDisPlayRegular',
                                fontSize: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            Sản phẩm cùng danh mục
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                {serverData.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('ProductDetail', {
                                                product: item,
                                            });
                                            goToTop();
                                        }}
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
                                            <View
                                                style={styles.newProductPriceView}
                                            >
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
                    ) : null
                }
               
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const itemWidth = width - 40;
const itemW = (width - 40) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        paddingHorizontal: 20,
        backgroundColor: color.white,
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width,
        paddingVertical: 10,
    },
    itemImage: {
        width: width - 100,
        flex: 1,
    },
    productPriceView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    discountedPriceText: { fontFamily: 'SFProDisplaySemiBold', fontSize: 20 },
    actualPriceText: {
        color: '#222',
        marginLeft: 10,
        textDecorationLine: 'line-through',
        fontSize: 18,
        fontFamily: 'SFProDisPlayRegular',
    },
    addToCartButton: {
        backgroundColor: color.primary,
        borderRadius: 4,
        width: itemWidth / 2,
        paddingVertical: 8,
        marginRight: 10,
    },
    productDescriptionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dfe4fe',
    },
    ratingView: {
        width: itemWidth,
        flex: 1,
    },
    itemRatingView: {
        flexDirection: 'row',
        width: itemWidth,
        paddingVertical: 5,
        borderBottomColor: color.greylight,
        borderBottomWidth: 1,
    },
    leftView: {
        paddingVertical: 5,
        alignItems: 'center',
        width: itemWidth * 0.12,
    },
    rightView: {
        width: itemWidth * 0.85,
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
