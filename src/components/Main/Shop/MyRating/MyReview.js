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
    const [product, setProduct] = useState([]);
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
    async function setproduct(
        sp_ma,
        dm_ma,
        sp_hinhanh,
        sp_ten,
        sp_soluonggioihan,
        sp_giaban
    ) {
        setProduct(
            sp_ma,
            dm_ma,
            sp_hinhanh,
            sp_ten,
            sp_soluonggioihan,
            sp_giaban
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {serverDataReview.length > 0 ? (
                    <View>
                        {serverDataReview.map((item, i) => (
                            <View key={i} style={styles.itemView}>
                                <View style={styles.leftView}>
                                    <Image
                                        source={{
                                            uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                        }}
                                        resizeMode="contain"
                                        style={{ width: 50, height: 50 }}
                                    />
                                </View>

                                <View style={styles.rightView}>
                                    <View style={styles.rightTopView}>
                                        <Text>{user.kh_name}</Text>
                                        <Text>
                                            {moment(
                                                new Date(item.dg_ngay)
                                            ).format('DD/MM/YYYY')}
                                        </Text>
                                    </View>
                                    <View style={styles.starView}>
                                        <AirbnbRating
                                            //isDisabled
                                            defaultRating={item.dg_sao}
                                            size={20}
                                            showRating={false}
                                        />
                                    </View>
                                    <Text>
                                        {item.dg_noidung !== null
                                            ? item.dg_noidung
                                            : 'Không chứa nội dung.'}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setproduct(
                                                item.sp_ma,
                                                item.dm_ma,
                                                item.sp_hinhanh,
                                                item.sp_ten,
                                                item.sp_soluonggioihan,
                                                item.sp_giaban
                                            );
                                            navigation.navigate(
                                                'ProductDetail',
                                                {
                                                    product,
                                                }
                                            );
                                            console.log(product);
                                        }}
                                        style={styles.productView}
                                    >
                                        <Image
                                            source={{
                                                uri: item.sp_hinhanh,
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

                {/* <Text> {JSON.stringify(serverDataReview)}</Text> */}
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
        paddingHorizontal: 10,
    },
    leftView: {
        width: itemWidth * 0.15,
    },
    rightView: {
        width: itemWidth * 0.85,
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
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productName: {},
    emptyView: {
        flex: 1,
        marginTop: 140,
        alignItems: 'center',
    },
});
