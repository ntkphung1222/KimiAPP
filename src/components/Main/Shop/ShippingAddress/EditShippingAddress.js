import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../../../../../assets/color';
import Header from '../Header';
import editAddress from '../../../../api/editAddress';

const EditShippingAddress = ({ navigation, route }) => {
    const { diachi } = route.params;
    const [name, setName] = useState(diachi.dc_nguoinhan);
    const [number, setNumber] = useState(diachi.dc_sdtnguoinhan);

    const [isFocus, setIsFocus] = useState(false);
    const [cityData, setCityData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [city, setCity] = useState(diachi.ttp_ma);
    const [district, setDistrict] = useState(diachi.qh_ma);
    const [ward, setWard] = useState(diachi.xptt_ma);
    const [road, setRoad] = useState(diachi.dc_chitiet);

    const handleCity = () => {
        // eslint-disable-next-line no-undef
        fetch('http://kimimylife.site/api/getCity')
            .then((response) => response.json())
            .then((responseJson) => {
                //setServerData(responseJson.results);
                //console.log(responseJson.results);
                const count = Object.keys(responseJson.results).length;
                const cityArray = [];
                for (let i = 0; i < count; i++) {
                    cityArray.push({
                        value: responseJson.results[i].ttp_ma,
                        label: responseJson.results[i].ttp_ten,
                    });
                }
                setCityData(cityArray);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDistrict = (matp) => {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/getDistrict?matp=${matp}`)
            .then((res) => res.json())
            .then((resJson) => {
                const count1 = Object.keys(resJson.results).length;
                const districtArray = [];
                for (let i = 0; i < count1; i++) {
                    districtArray.push({
                        value: resJson.results[i].qh_ma,
                        label: resJson.results[i].qh_ten,
                    });
                }
                setDistrictData(districtArray);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleWard = (maqh) => {
        // eslint-disable-next-line no-undef
        fetch(`http://kimimylife.site/api/getWard?maqh=${maqh}`)
            .then((res) => res.json())
            .then((resJson) => {
                const count2 = Object.keys(resJson.results).length;
                const wardArray = [];
                for (let i = 0; i < count2; i++) {
                    wardArray.push({
                        value: resJson.results[i].xptt_ma,
                        label: resJson.results[i].xptt_ten,
                    });
                }
                setWardData(wardArray);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderLabel = (text) => <Text style={styles.label}>{text}</Text>;
    useEffect(() => {
        handleCity();
        handleDistrict(diachi.ttp_ma);
        handleWard(diachi.qh_ma);
    }, []);

    function handleSubmit() {
        if (
            road === '' ||
            ward === null ||
            district === null ||
            city === null ||
            name === '' ||
            number === ''
        ) {
            Alert.alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        editAddress(diachi.dc_ma, name, number, ward, road)
        .then((res) => {
            if (res.success) {
                Alert.alert('Địa chỉ đã được cập nhật.');
                navigation.goBack();
            } else {
                Alert.alert('Thao tác thất bại');
            }
        });
    }
    return (
        <View style={styles.container}>
            <Header title="Sửa địa chỉ" navigation={navigation} />
            <View style={styles.wrapper}>
                <View>
                    <View>
                        {renderLabel('Tên người nhận')}
                        <TextInput
                            style={styles.inputStyle}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder="Tên người nhận"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View>
                        {renderLabel('Số điện thoại')}
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType="decimal-pad"
                            placeholderStyle={styles.placeholderStyle}
                            placeholder="Số điện thoại"
                            value={number}
                            onChangeText={(text) => setNumber(text)}
                        />
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 10 }}>
                        {renderLabel('Tỉnh/ Thành phố')}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: color.primary },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder={
                                !isFocus ? 'Chọn tỉnh/ thành phố' : '...'
                            }
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={cityData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            searchPlaceholder="Tìm kiếm..."
                            value={city}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setCity(item.value);
                                handleDistrict(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? color.primary : 'black'}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                    <View>
                        {renderLabel('Quận/ Huyện')}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: color.primary },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder={!isFocus ? 'Chọn quận/ huyện' : '...'}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={districtData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            searchPlaceholder="Tìm kiếm..."
                            value={district}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setDistrict(item.value);
                                handleWard(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? color.primary : 'black'}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                    <View>
                        {renderLabel('Xã/ Phường/ Thị Trấn')}
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isFocus && { borderColor: color.primary },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder={
                                !isFocus ? 'Chọn xã/ phường/ thị trấn' : '...'
                            }
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={wardData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            searchPlaceholder="Tìm kiếm..."
                            value={ward}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                setWard(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? color.primary : 'black'}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                    <View>
                        {renderLabel('Số nhà/ Tên đường')}
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Số nhà, tên đường"
                            value={road}
                            onChangeText={(text) => setRoad(text)}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            handleSubmit();
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditShippingAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
        //padding: 16,
        //justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular',
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    inputStyle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: 5,
        marginVertical: 20,
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular',
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 15,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'SFProDisPlayRegular'
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'SFProDisPlayRegular'

    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'SFProDisPlayRegular'

    },
    button: {
        elevation: 8,
        backgroundColor: color.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        marginBottom: 25,
    },
    textButton: {
        fontSize: 18,
        color: color.white,
        fontFamily: 'SFProDisPlayRegular',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
});
