import React, { useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, withBadge } from '@rneui/themed';
import Home from './Home/Home';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import Account from './Account/Account';
//import Order from './Order/Order';
//import Signin from '../../Authentication/Signin';
//import Signup from '../../Authentication/Signup';
import color from '../../../../assets/color';
import Signin from '../../Authentication/Signin';
//import global from '../../global';

const Tab = createBottomTabNavigator();

export default function Shop() {
  // const [cart, setCart] = useState([]);
  // global.addProductToCart = addProductToCart;
  // const addProductToCart = (product) => {
  //   setCart([...cart, product]);
  // };
  const BadgedIcon = withBadge(1)(Icon);
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
          component={Signin}
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
