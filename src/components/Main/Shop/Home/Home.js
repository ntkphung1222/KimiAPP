import React, { useEffect, useState } from 'react';
import {
    LogBox,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    RefreshControl,
    Image,
    Dimensions,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Icon, Badge } from 'react-native-elements';
import color from '../../../../../assets/color';
import Banner from './Banner';
import Category from './Category';
import NewProduct from './NewProduct';
import font from '../../../../../assets/font';

export default function Home({ navigation, route }) {
    const [user, setUser] = useState(null);
    const [dataCart, setDataCart] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    //get Weather
    const [temperature, setTemperature] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [humidity, setHumidity] = useState();
    const [icon, setIcon] = useState();
    const [description, setDescription] = useState();

    async function loadData() {
        await AsyncStorage.getItem('cart').then((cart) => {
            if (cart !== null) {
                const cartS = JSON.parse(cart);
                setDataCart(cartS);
            }
        });
    }
    const getWeather = async (e) => {
        const Api_Key = '8d2de98e089f1c28e1a22fc19a24ef04';
        const city = 'Cần Thơ';
        const country = 'Viet Nam';
        const lang = 'vi';
        const api_call = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&lang=${lang}&units=metric`
        );
        const response = await api_call.json();
        //console.log(response);
        setTemperature(response.main.temp),
            setCity(response.name),
            setCountry(response.sys.country),
            setHumidity(response.main.humidity),
            setDescription(response.weather[0].description),
            setIcon(response.weather[0].icon);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadData();
        getWeather();
        setRefreshing(false);
    }, []);
    const { container, header, textHeader } = styles;
    useEffect(() => {
        loadData();
        getWeather();
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
                        onPress={() => {
                            if(user !== null)
                            navigation.navigate('Notification', { user });
                            else
                            Alert.alert('Đăng nhập để xem thông báo nha!');
                        }}
                    >
                        <Icon
                            type="feather"
                            name="bell"
                            color={color.white}
                            size={25}
                        />
                    </TouchableOpacity>
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
                            value={dataCart.length}
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
                <View style={styles.bigCircle} />
                <View style={styles.weatherView}>
                    {/* <Text>{Math.round(temperature - 273.15,1)}&deg;C,{city},{country},{humidity},{description}</Text> */}
                    {/* <Text>{moment().format('ddd')}, {moment().format('DD')}, {moment().format('MMMM')}</Text> */}
                    <View style={styles.leftWeatherView}>
                        <Text style={styles.degreeText}>
                            {Math.round(temperature, 1)}
                        </Text>
                        <Text style={styles.cText}>&deg;C</Text>
                    </View>
                    <View style={styles.rightWeatherView}>
                        <Image
                            source={{
                                uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
                            }}
                            style={styles.iconWeather}
                        />
                        <Text style={font.textNormal}>{description}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 100 }}>
                    <Category refreshControl navigation={navigation} />
                    <NewProduct refreshControl navigation={navigation} />
                </View>
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');
const weatherWidth = width - 40;
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
        zIndex: -999,
    },
    weatherView: {
        flexDirection: 'row',
        backgroundColor: color.white,
        marginHorizontal: 20,
        width: weatherWidth,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'space-between',
    },
    leftWeatherView: {
        width: weatherWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    degreeText: {
        fontFamily: 'SFProDisplaySemiBold',
        fontSize: 40,
    },
    cText: {
        position: 'absolute',
        top: 35,
        right: 40,
        fontFamily: 'SFProDisplaySemiBold',
        fontSize: 20,
    },
    rightWeatherView: {
        width: weatherWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWeather: {
        width: weatherWidth / 4,
        height: weatherWidth / 4,
    },
});
