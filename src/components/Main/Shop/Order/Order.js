import React from 'react';
import { StyleSheet, View } from 'react-native';

// npm install @react-navigation/material-top-tabs react-native-tab-view
// eslint-disable-next-line import/no-unresolved
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../Header';
import color from '../../../../../assets/color';
import OrderHistory from './OrderHistory';
import OrderProcessing from './OrderProcessing';
import OrderCompleted from './OrderCompleted';

const Tab = createMaterialTopTabNavigator();
export default function Order({ navigation, route }) {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" navigation={navigation} />
      <Tab.Navigator>
        <Tab.Screen
          name="Tất cả"
          initialParams={{ user }}
          component={OrderHistory}
        />
        <Tab.Screen
          name="Đang xử lý"
          initialParams={{ user }}
          component={OrderProcessing}
        />
        <Tab.Screen name="Đã giao" component={OrderCompleted} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
