import React, { useEffect, useState } from 'react';
import {
    LogBox,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Badge } from 'react-native-elements';
import color from '../../../../../assets/color';
import Banner from './Banner';
import Category from './Category';
import NewProduct from './NewProduct';

export default function Home({ navigation, route }) {
    const [user, setUser] = useState(null);
    const [dataCart, setDataCart] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [count, setCount] = useState();

    async function loadData() {
        await AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null) {
                const cartS = JSON.parse(cart);
                setDataCart(cartS);
                setCount(dataCart.length);
            }
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadData();
        setRefreshing(false);
    }, []);
    const { container, header, textHeader } = styles;
    useEffect(() => {
        loadData();
        // eslint-disable-next-line no-undef
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        async function loadUser() {
            await AsyncStorage.getItem('user').then((userR) => {
                if (userR !== null) {
                    const userCurrent = JSON.parse(userR);
                    setUser(userCurrent);
                }
            });
        }
        loadUser();
    }, []);

    //const BadgedIcon = withBadge(count)(Icon);

    return (
        <View style={container}>
            <View style={header}>
                <Text style={textHeader}>
                    {user !== null ? (
                        <Text>Xin chào, {user.kh_ten} </Text>
                    ) : (
                        <Text>Kimi xin chào! </Text>
                    )}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Icon
                            type="feather"
                            name="search"
                            color={color.white}
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
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
                                right: -12,
                            }}
                        />
                        <Icon
                            type="feather"
                            name="shopping-cart"
                            color={color.white}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: color.backgroundColor }}
            >
                <Banner />
                {/* <View style={styles.bigCircle} /> */}
                <Category refreshControl navigation={navigation} />
                <NewProduct refreshControl navigation={navigation} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    header: {
        height: 50,
        paddingHorizontal: 20,
        marginTop: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: color.primary,
    },
    textHeader: {
        color: color.white,
        fontFamily: 'SFProDisplaySemiBold',
        fontSize: 18,
    },
    bigCircle: {
        width: 1200,
        height: 1200,
        backgroundColor: color.primary,
        borderRadius: 1200,
        position: 'absolute',
        top: -1000,
        left: -400,
        right: -400,
    },
});
