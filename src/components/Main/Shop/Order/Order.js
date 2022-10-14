import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// npm install @react-navigation/material-top-tabs react-native-tab-view
// eslint-disable-next-line import/no-unresolved
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import color from '../../../../../assets/color';
import OrderProcessing from './OrderProcessing';
import OrderCompleted from './OrderCompleted';

const Tab = createMaterialTopTabNavigator();
export default function Order() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Đang xử lý" component={OrderProcessing} />
        <Tab.Screen name="Đã hoàn thành" component={OrderCompleted} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
    color: color.white
  },
  wrapper: {
    
  },
});
