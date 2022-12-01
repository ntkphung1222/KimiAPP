import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    RefreshControl,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import Header from '../Header';
import setDCMD from '../../../../api/setDCMD';

export default function ShippingAddress({ navigation, route }) {
    const { user } = route.params;
    const [dataAddress, setDataAddress] = useState([]);
    const [isFocus, setIsFocus] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const onPress = (iddiachi) => {
        setIsFocus(iddiachi);
        setDCMD(iddiachi, user.kh_ma)
            .then((res) => {})
            .catch((error) => console.log(error));
        // navigation.goBack({ iddiachi });
        //Alert.alert(iddiachi);
    };

    async function loadData() {
        fetch(`http://kimimylife.site/api/getAllDCByID?dc_kh=${user.kh_ma}`)
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response from the API Call
                setDataAddress(responseJson.results);
            })
            .then(() => {})
            .catch((error) => {
                console.error(error);
            });
    }
    function deleteAddress(madc) {
        fetch('http://kimimylife.site/api/deleteAddress', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dc_ma: madc,
            }),
        }).then((res) => res.json());
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadData();
        setRefreshing(false);
    }, []);

    const renderLabel = (text) => <Text style={styles.label}>{text}</Text>;

    function loadDCMD() {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/defaultAddress?dc_kh=${user.kh_ma}`)
            .then((response) => response.json())
            .then((res) => {
                if(res.success){
                setIsFocus(res.results[0].dc_ma);}
                else{
                    setIsFocus(0);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        loadData();
        loadDCMD();
    }, []);
    return (
        <View style={styles.container}>
            <Header title={'Danh sách địa chỉ'} navigation={navigation} />
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AddShippingAddress', { user })
                }
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 28,
                }}
            >
                <Icon
                    name="plus"
                    type="feather"
                    size={30}
                    color={color.white}
                />
            </TouchableOpacity>

            <ScrollView
                style={styles.wrapper}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {dataAddress.length > 0 ? (
                    <View>
                        {dataAddress.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    onPress(item.dc_ma);
                                }}
                                style={[
                                    styles.itemAddress,
                                    isFocus === item.dc_ma && {
                                        borderColor: color.primary,
                                    },
                                ]}
                            >
                                {isFocus === item.dc_ma
                                    ? renderLabel('Mặc định')
                                    : null}
                                <Text style={font.textNormal}>
                                    {item.dc_nguoinhan} | {item.dc_sdtnguoinhan}
                                </Text>
                                <Text style={font.textNormal}>
                                    {item.dc_chitiet}, {item.xpttname},{' '}
                                    {item.qhname}, {item.ttpname}
                                </Text>
                                <View style={styles.actionView}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                'EditShippingAddress',
                                                { diachi: item }
                                            )
                                        }
                                        style={styles.actionEdit}
                                    >
                                        <Icon
                                            type="feather"
                                            name="edit-2"
                                            size={16}
                                            color={color.star}
                                        />
                                        <Text style={styles.textEdit}>Sửa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                           
                                                Alert.alert(
                                                    'Xóa địa chỉ này?',
                                                    '',
                                                    [
                                                        { text: 'Trở về' },
                                                        {
                                                            text: 'OK',
                                                            onPress: () => {
                                                                //dataAddress.splice(i, 1);
                                                                deleteAddress(item.dc_ma)
                                                            },
                                                        },
                                                    ]
                                                )
                                        }
                                        style={styles.actionDelete}
                                    >
                                        <Icon
                                            type="feather"
                                            name="trash-2"
                                            size={16}
                                            color={color.red}
                                        />
                                        <Text style={styles.textDelete}>
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyView}>
                        <Text style={font.textTitle1}>
                            Chưa có địa chỉ nào.{' '}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.white,
        paddingVertical: 10,
    },
    itemAddress: {
        borderColor: color.borderSecond,
        borderWidth: 1,
        padding: 10,
        //justifyContent: 'center',
        //alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        width: width - 40,
        elevation: 1,
    },
    actionView: {
        flexDirection: 'row',
        width: 120,
        justifyContent: 'space-between',
    },
    actionEdit: {
        flexDirection: 'row',
        width: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionDelete: {
        flexDirection: 'row',
        width: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textDelete: {
        color: color.red,
    },
    textEdit: {
        color: color.star,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 15,
        top: -14,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'SFProDisPlayRegular',
    },
    emptyView: {
        flex: 1,
        marginTop: 140,
        alignItems: 'center',
    },
});
