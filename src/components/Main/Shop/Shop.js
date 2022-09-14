import React from 'react';
import { View } from 'react-native';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-elements';
import { Icon, withBadge } from '@rneui/themed';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Products from './Home/Products';
import Cart from './Cart/Cart';
//import Header from './Header';
import color from '../../../../assets/color';

const Tab = createBottomTabNavigator();
const BadgedIcon = withBadge(1)(Icon);

export default function Shop() {
  return (
    <View style={{ flex: 1 }}>
      {/* <View>
      <Header />
    </View> */}

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
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tab Search"
          component={Products}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="message" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Giỏ hàng"
          component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => (
              <BadgedIcon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tài khoản"
          component={Contact}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
