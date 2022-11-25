import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Form, InputText } from 'validate-form-in-expo-style';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import color from '../../../../../assets/color';
import Header from '../Header';
import changePassword from '../../../../api/changePassword';

export default function ChangePassword({ navigation, route }) {
    const { user } = route.params;
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    function handleSubmit() {
        if (oldpassword === '' || newpassword === '') {
            Alert.alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        changePassword(user.kh_email, oldpassword, newpassword)
            .then((res) => {
                if (res.success) {
                    Alert.alert(res.message);
                    navigation.goBack();
                } else {
                    Alert.alert(res.message);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <View style={styles.container}>
            <Header title="Đổi mật khẩu" navigation={navigation} />
            <View style={styles.wrapper}>
                <Form onSubmit={handleSubmit}>
                    <InputText
                        name="oldpassword"
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
                        value={oldpassword}
                        placeholder="Mật khẩu cũ"
                        leftIcon={
                            <FontAwesome
                                name="lock"
                                color={color.darkblue}
                                size={20}
                            />
                        }
                        onChangeText={(text) => setOldPassword(text)}
                        labelStyle={styles.labelStyle}
                        style={styles.inputStyle}
                        containerStyle={styles.input}
                        floatingTopValue={5}
                        floatingFontSize={5}
                    />
                    <InputText
                        name="newpassword"
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
                        value={newpassword}
                        placeholder="Mật khẩu mới"
                        leftIcon={
                            <FontAwesome
                                name="lock"
                                color={color.darkblue}
                                size={20}
                            />
                        }
                        onChangeText={(text) => setNewPassword(text)}
                        labelStyle={styles.labelStyle}
                        style={styles.inputStyle}
                        containerStyle={styles.input}
                        floatingTopValue={5}
                        floatingFontSize={5}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleSubmit()}
                        style={styles.button}
                    >
                        <Text style={styles.textButton}>Xác nhận</Text>
                    </TouchableOpacity>
                </Form>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    wrapper: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20,
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
});
