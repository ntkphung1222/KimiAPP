import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../Header';
import color from '../../../../../assets/color';
import MyReview from './MyReview';
import ToRate from './ToRate';

const Tab = createMaterialTopTabNavigator();
export default function MyRating({ navigation, route }) {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Header title="Đánh giá của tôi" navigation={navigation} />
      <Tab.Navigator>
        <Tab.Screen
          name="Chờ đánh giá"
          initialParams={{ user }}
          component={ToRate}
        />
        <Tab.Screen
          name="Đã đánh giá"
          initialParams={{ user }}
          component={MyReview}
        />
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
