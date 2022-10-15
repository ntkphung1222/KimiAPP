import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, withBadge } from '@rneui/themed';
import Home from './Home/Home';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import Account from './Account/Account';
import Order from './Order/Order';
//import Signin from '../../Authentication/Signin';
//import Signup from '../../Authentication/Signup';
import color from '../../../../assets/color';
//import global from '../../global';

const Tab = createBottomTabNavigator();
const BadgedIcon = withBadge(1)(Icon);

export default function Shop() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          position: 'absolute',
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Trang chủ"
          component={Home}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tìm kiếm"
          component={Search}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Đơn hàng"
          component={Order}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="receipt" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Giỏ hàng"
          component={Cart}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <BadgedIcon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tài khoản"
          component={Account}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
