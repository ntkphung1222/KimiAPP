import React from 'react';
import { View } from 'react-native';

// npm i @react-navigation/bottom-tabs react-native-elements
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Search from './Search/Search';
import Cart from './Cart/Cart';
//import Header from './Header';

const Tab = createBottomTabNavigator();

export default function Shop() {
  return (
    <View style={{ flex: 1 }}>
    {/* <View>
      <Header />
    </View> */}

    <Tab.Navigator screenOptions={{ headerShown: false, position: 'absolute' }}>
      <Tab.Screen
        name='Trang chủ'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Giỏ hàng'
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='message' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Tab Search'
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='message' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Contact'
        component={Contact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
}
