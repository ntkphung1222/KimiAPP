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
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderCompleted({ navigation, route }) {
    try {
        const { user } = route.params;
        const [refreshing, setRefreshing] = useState(false);

        const [serverData, setServerData] = useState({});
        async function loadData() {
            fetch(`http://kimimylife.site/api/getToRate?hdx_kh=${user.kh_ma}`)
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
        // const [serverDataToAccept, setServerDataToAccept] = useState([]);
        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            loadData();
            setRefreshing(false);
        }, []);
        useEffect(() => {
            loadData();
        }, []);

        return (
            <View style={styles.container}>
                {serverData.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View>
                            {serverData.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {}}
                                    style={styles.productView}
                                >
                                    <View style={styles.leftView}>
                                        <Image
                                            source={{
                                                uri: `http://kimimylife.site/sp_hinhanh/${item.sp_hinhanh}`,
                                            }}
                                            resizeMode="contain"
                                            style={styles.productImage}
                                        />
                                    </View>
                                    <View style={styles.rightView}>
                                        <Text style={styles.productName}>
                                            {item.sp_ten}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'RatingProduct',
                                                    { product: item }
                                                )
                                            }
                                            style={styles.ratingButton}
                                        >
                                            <Text style={font.textNormalWhite}>
                                                Đánh giá
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.emptyView}>
                        <Text style={font.textTitle1}>
                            Không có đơn hàng chờ đánh giá.
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
const itemWidth = width - 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    productView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: itemWidth,
        marginHorizontal: 10,
        marginVertical: 5,
        //borderColor: 'gray',
        backgroundColor: color.white,
        borderRadius: 8,
        elevation: 1,
        //borderWidth: 0.5,
    },
    leftView: {
        width: itemWidth * 0.3,
        padding: 5,
    },
    productImage: {
        width: itemWidth * 0.25,
        height: itemWidth * 0.25,
    },
    rightView: {
        width: itemWidth * 0.7,
        padding: 5,
        height: 0.3 * itemWidth,
        justifyContent: 'space-between',
    },
    productName: {
        fontFamily: 'SFProDisPlayRegular',
        fontSize: 16,
    },
    ratingButton: {
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 40,
        width: 80,
        justifyContent: 'center',
        backgroundColor: color.star,
        marginLeft: 160,
    },
    emptyView: {
        flex: 1,
        marginTop: 140,
        alignItems: 'center',
    },
});
