//import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, StatusBar } from 'react-native';

const { height } = Dimensions.get('window'); 
export default function Header() {
    useEffect(() => {
        //StatusBar.setBarStyle('light-content', true);
        StatusBar.setHidden(true);
      }, []);
    return (
        <SafeAreaView>
            <View style={{ height: height / 10 }}>
                <Text>Header</Text>
            </View>
        </SafeAreaView>
    );
}

