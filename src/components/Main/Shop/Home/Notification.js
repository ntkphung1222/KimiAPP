import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Header from '../Header';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

export default function Notification({ navigation, route }) {
    const { user } = route.params;
    const [dataNoti, setDataNoti] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function loadData() {
        fetch(`http://kimimylife.site/api/getNotification?dc_kh=${user.kh_ma}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setDataNoti(responseJson.results);
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
    return (
        <View style={styles.container}>
            <Header title="Thông báo" navigation={navigation} />
            <ScrollView
                style={styles.wrapper}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {dataNoti.length > 0 ? (
                    <View style={styles.itemsView}>
                        {dataNoti.map((item) => (
                            <TouchableOpacity
                                key={item.tb_ma}
                                style={styles.itemView}
                            >
                                <View style={styles.topItemView}>
                                    <View style={styles.topLeftItemView}>
                                        <View
                                            style={[
                                                styles.iconView,
                                                item.tb_trangthai === '-1'
                                                    ? styles.bgRed
                                                    : item.tb_trangthai === '1'
                                                    ? styles.bgBlue
                                                    : item.tb_trangthai === '2'
                                                    ? styles.bgGreen
                                                    : styles.iconView,
                                            ]}
                                        >
                                            <Icon
                                                name="bells"
                                                type="antdesign"
                                                size={20}
                                                color="white"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.topRightItemView}>
                                        <Text style={font.textBold}>
                                            {item.tb_tieude}
                                        </Text>
                                        <Text style={font.textNormalSmall}>
                                            {item.created_at}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.bottomItemView}>
                                    <Text style={font.textNormal}>
                                        {item.tb_noidung}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View
                        style={styles.emptyView}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <Text style={font.textTitle1}>
                            Chưa có thông báo nào.{' '}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const itemWidth = width - 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    itemsView: {
        padding: 10,
    },
    itemView: {
        borderRadius: 5,
        elevation: 0.8,
        marginBottom: 10,
    },
    topItemView: {
        flexDirection: 'row',
    },
    topLeftItemView: {
        width: itemWidth * 0.13,
    },
    iconView: {
        width: itemWidth * 0.1,
        height: itemWidth * 0.1,
        backgroundColor: 'orange',
        borderRadius: 20,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRightItemView: {
        width: itemWidth * 0.87,
        paddingHorizontal: 10,
    },
    bottomItemView: {
        width: itemWidth,
        paddingHorizontal: 10,
    },
    emptyView: {
        flex: 1,
        marginTop: 140,
        alignItems: 'center',
    },
    bgRed: {
        backgroundColor: color.red,
    },
    bgGreen: {
        backgroundColor: 'green',
    },
    bgBlue: {
        backgroundColor: color.primary,
    },
});
