import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import moment from 'moment/moment';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function MyReview({ route, navigation }) {
    const { user } = route.params;
    const [serverDataReview, setServerDataReview] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/getAllDGByID?kh_ma=${user.kh_ma}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setServerDataReview(responseJson.results);
            })
            .then(() => {})
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapper}
                showsVerticalScrollIndicator={false}
            >
                {serverDataReview.length > 0 ? (
                    <View>
                        {serverDataReview.map((item, i) => (
                            <View key={i} style={styles.itemView}>
                                <View style={styles.leftView}>
                                    {user.kh_anhdaidien !== null ? (
                                        <Image
                                            source={{
                                                uri: `http://kimimylife.site/kh_avatar/${user.kh_anhdaidien}`,
                                            }}
                                            resizeMode="cover"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            source={{
                                                uri: 'http://kimimylife.site/kh_avatar/userAvatar.png',
                                            }}
                                            resizeMode="cover"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                            }}
                                        />
                                    )}
                                </View>

                                <View style={styles.rightView}>
                                    <View style={styles.rightTopView}>
                                        <Text style={font.textNormal}>
                                            {user.kh_ten}
                                        </Text>
                                        <Text style={font.textNormal}>
                                            {moment(
                                                new Date(item.dg_ngay)
                                            ).format('DD/MM/YYYY')}
                                        </Text>
                                    </View>
                                    <View style={styles.starView}>
                                        <AirbnbRating
                                            isDisabled
                                            defaultRating={item.dg_sao}
                                            size={20}
                                            showRating={false}
                                        />
                                    </View>
                                    <Text style={font.textNormal}>
                                        {item.dg_noidung !== null
                                            ? item.dg_noidung
                                            : 'Không chứa nội dung.'}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(
                                                'ProductDetail',
                                                {
                                                    product: item,
                                                }
                                            );
                                        }}
                                        style={styles.productView}
                                    >
                                        <Image
                                            source={{
                                                uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                            }}
                                            resizeMode="contain"
                                            style={styles.productImage}
                                        />
                                        <Text style={styles.productName}>
                                            {item.sp_ten}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyView}>
                        <Text style={font.textTitle1}>Không có đánh giá.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const itemWidth = width - 20;
const styles = StyleSheet.create({
    container: {},
    wrapper: {
        backgroundColor: color.backgroundColor,
    },
    itemView: {
        flexDirection: 'row',
        width,
        flex: 1,
        marginBottom: 10,
        backgroundColor: color.white,
        padding: 10,
    },
    leftView: {
        paddingTop: 8,
        width: itemWidth * 0.15,
    },
    rightView: {
        width: itemWidth * 0.85,
        paddingRight: 5,
    },
    rightTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    starView: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    productView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: itemWidth * 0.85,
    },
    productImage: {
        width: itemWidth * 0.15,
        height: itemWidth * 0.15,
    },
    productName: {
        fontFamily: 'SFProDisPlayRegular',
        fontSize: 14,
        width: itemWidth * 0.68,
    },
    emptyView: {
        flex: 1,
        marginTop: 140,
        alignItems: 'center',
    },
});
