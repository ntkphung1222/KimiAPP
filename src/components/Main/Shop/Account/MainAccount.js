import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Account from './Account';
import Signin from '../../../Authentication/Signin';
import {onSignIn} from '../../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainAccount({ navigation }) {
    const [user, setUser] = useState([]);
   // const [isLogedIn, setIsLogedIn] = useState(false);
    onSignIn = onSignIn;
    function onSignIn(){
        setUser(null);
    }
    useEffect(() => {
        async function findUser() {
            await AsyncStorage.getItem('user').then((userR) => {
                if (userR !== null) {
                    const userCurrent = JSON.parse(userR);
                    //setUser(userCurrent);
                } else {
                    navigation.navigate('Signin');
                }
            });
        }
        findUser();
        //console.log(user);
    }, []);
    //global.onSignIn = onSignIn;
    // eslint-disable-next-line no-shadow
    // const onSignIn = () => {
    //     setUser(true);
    // };
    const mainJSX = user ? (
        <Account navigation={navigation} />
    ) : (
        <Signin navigation={navigation} />
    );
    return <View style={styles.Maincontainer}>{mainJSX}</View>;
}

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,
    },
});
