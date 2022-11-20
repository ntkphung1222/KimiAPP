import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
    await AsyncStorage.setItem('token', token);
};

export default saveToken;
