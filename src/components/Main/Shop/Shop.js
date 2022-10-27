import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from './Home/Home';
import Search from './Search/Search';
import Post from './Post/Post';
//import Chat from './Chat/Chat';
import Account from './Account/Account';
import color from '../../../../assets/color';

const Tab = createBottomTabNavigator();

export default function Shop() {
  // useEffect(() => {
  //   AsyncStorage.getItem('cart').then((cart) => {
  //     if (cart !== null) {
  //       cartS = JSON.parse(cart);
  //       setDataCart(cartS);
  //     }
  //   }); 
  // }, []);
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
          name="Bài viết"
          component={Post}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="post-add" color={color} size={size} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Nhắn tin"
          component={Chat}
          options={{
            // eslint-disable-next-line no-shadow
            tabBarIcon: ({ color, size }) => (
              <Icon name="chat" color={color} size={size} />
            ),
          }}
        /> */}
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
