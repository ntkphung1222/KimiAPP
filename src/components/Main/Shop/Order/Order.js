import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../Header';
import color from '../../../../../assets/color';
import OrderHistory from './OrderHistory';
import ToAccept from './ToAccept';
import ToShip from './ToShip';
import OrderCompleted from './OrderCompleted';
import OrderCancled from './OrderCancled';

const Tab = createMaterialTopTabNavigator();
export default function Order({ navigation, route }) {
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <Header title="Đơn hàng" navigation={navigation} />
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    // tabBarItemStyle: { width: 120 },
                    // tabBarStyle: { width, },
                }}
            >
                <Tab.Screen
                    name="Tất cả"
                    initialParams={{ user }}
                    component={OrderHistory}
                />
                <Tab.Screen
                    name="Chờ xác nhận"
                    initialParams={{ user }}
                    component={ToAccept}
                />
                <Tab.Screen
                    name="Đang giao"
                    initialParams={{ user }}
                    component={ToShip}
                />
                <Tab.Screen
                    name="Đã giao"
                    initialParams={{ user }}
                    component={OrderCompleted}
                />
                <Tab.Screen
                    name="Đã hủy"
                    initialParams={{ user }}
                    component={OrderCancled}
                />
            </Tab.Navigator>
        </View>
    );
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: color.primary,
        // justifyContent: 'center',
    },
    header: {
        height: 50,
        backgroundColor: color.primary,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: color.white,
    },
    wrapper: {},
});
