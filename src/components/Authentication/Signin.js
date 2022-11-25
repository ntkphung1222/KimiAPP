import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, InputText } from 'validate-form-in-expo-style';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../../assets/color';
import font from '../../../assets/font';
import signIn from '../../api/signIn';
import shipper from '../../images/shipper.png';


//import saveToken from '../../api/saveToken';
//import getToken from '../../api/getToken';
import { onSignIn } from '../global';

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const form = useRef(null);
    // const [user, setUser] = useState();
    // const findUser = async () => {
    //     const result = await AsyncStorage.getItem('user');
    //     if (result !== null) {
    //         setUser(JSON.parse(result));
    //     }
    // };
    useEffect(() => {
        //getToken().then((a) => console.log(a));
    }, []);
    function handleSubmit() {
        //form.submit();
        if (email === '' || password === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        signIn(email, password)
            .then(async (res) => {
                // eslint-disable-next-line no-const-assign
                //saveToken(res.access_token);
                //Alert.alert(res.user);
                if (res.success) {
                    onSignIn();
                    await AsyncStorage.setItem(
                        'user',
                        JSON.stringify(res.user)
                    ).then(() => navigation.navigate('Shop'));
                } else {
                    Alert.alert(res.message);
                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Shop')}
            >
                <Icon
                    name="angle-left"
                    type="font-awesome"
                    size={30}
                    color={color.black}
                />
                <Text style={styles.headerTitle}>Về trang chủ</Text>
            </TouchableOpacity>
            < View style={styles.imageView}>
            <Image source={shipper} style={styles.image} />

            </View>
            <View style={styles.wrapper}>
                <Text style={font.textTitle}>Đăng nhập</Text>
                <Form onSubmit={handleSubmit}>
                    <InputText
                        name="email"
                        validateNames={['required', 'validEmail']}
                        errorMessages={[
                            'Vui lòng nhập địa chỉ email',
                            'Email chưa hợp lệ',
                        ]}
                        placeholder="Email"
                        type="text"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        leftIcon={
                            <FontAwesome
                                name="user-o"
                                color={color.darkblue}
                                size={20}
                            />
                        }
                        invalidIcon={
                            <Icon
                                type="feather"
                                name="alert-circle"
                                color={color.red}
                                size={20}
                            />
                        }
                        validIcon={
                            <Icon
                                type="feather"
                                name="check-circle"
                                color={color.primary}
                                size={20}
                            />
                        }
                        style={styles.inputStyle}
                        containerStyle={styles.input}
                    />
                    <InputText
                        name="password"
                        secureTextEntry
                        passwordHideIcon={
                            <Icon
                                name="eye-off"
                                color={color.darkblue}
                                size={20}
                                type="feather"
                            />
                        }
                        passwordShowIcon={
                            <Icon
                                name="eye"
                                color={color.darkblue}
                                size={20}
                                type="feather"
                            />
                        }
                        validateNames={['minStringLength:6', 'required']}
                        errorMessages={[
                            'Tối thiểu 6 kí tự',
                            'Vui lòng nhập mật khẩu',
                        ]}
                        type="text"
                        value={password}
                        placeholder="Mật khẩu"
                        leftIcon={
                            <FontAwesome
                                name="lock"
                                color={color.darkblue}
                                size={20}
                            />
                        }
                        onChangeText={(text) => setPassword(text)}
                        labelStyle={styles.labelStyle}
                        style={styles.inputStyle}
                        containerStyle={styles.input}
                        floatingTopValue={5}
                        floatingFontSize={5}
                    />
                    <View style={styles.forgotPasswordView}>
                        <Text
                            style={font.label}
                            onPress={() =>
                                navigation.navigate('ForgotPassword')
                            }
                        >
                            Quên mật khẩu?
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Đăng nhập</Text>
                    </TouchableOpacity>
                </Form>
                <View style={styles.bottomView}>
                    {/* <View style={styles.signInBar}>
                        <Image source={fb} style={styles.imageStyle} />
                        <Image source={google} style={styles.imageStyle} />
                    </View> */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={font.label}> Chưa có tài khoản?</Text>
                        <Text
                            style={font.labelBold}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            {' '}
                            Đăng ký
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Signin;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        justifyContent: 'flex-end',
    },
    wrapper: {
        width,
        elevation: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        backgroundColor: color.white,
    },
    headerTitle: {
        fontSize: 20,
        color: color.black,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    textBody: {
        fontFamily: 'SFProDisPlayRegular',
        fontSize: 16,
        color: color.darkblue,
        marginHorizontal: 20,
        textAlign: 'center',
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
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    inputStyle: {
        color: color.text,
        paddingTop: 0,
        fontSize: 16,
    },
    input: {
        paddingHorizontal: 10,
        borderWidth: 2,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color.primary,
        borderBottomColor: color.primary,
        borderRadius: 15,
        height: 50,
    },
    bottomView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInBar: {
        flexDirection: 'row',
    },
    imageStyle: {
        width: 30,
        height: 30,
        margin: 10,
    },
    forgotPasswordView: {
        marginVertical: 2,
        alignItems: 'flex-end',
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 350,
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 20,
    },
});
