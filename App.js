import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/components/Authentication/Authentication';
import ChangeInfo from './src/components/Main/Shop/Account/ChangeInfo';
import Main from './src/components/Main/Main';
//import OrderHistory from './src/components/OrderHistory/OrderHistory';
import Cart from './src/components/Main/Shop/Cart/Cart';
import Payment from './src/components/Main/Shop/Cart/Payment';
import ShippingAddress from './src/components/Main/Shop/Cart/ShippingAddress';
import Account from './src/components/Main/Shop/Account/Account';
import ChangePassword from './src/components/Main/Shop/ChangePassword/ChangePassword';

import Products from './src/components/Main/Shop/Home/Products';
import ProductDetail from './src/components/Main/Shop/Home/ProductDetail';
//import NewProducts from './src/components/Main/Shop/Home/NewProducts';

import Categories from './src/components/Main/Shop/Home/Categories';
import Post from './src/components/Main/Shop/Post/Post';

import Search from './src/components/Main/Shop/Search/Search';

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line global-require
    // SFProDisPlayRegular: require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    // eslint-disable-next-line global-require
    SFProDisplaySemiBold: require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
  });

  const [fontsLoaded1] = useFonts({
    // eslint-disable-next-line global-require
     SFProDisPlayRegular: require('./assets/fonts/SF-Pro-Display-Regular.otf'),  
  });
  
  if (!fontsLoaded || !fontsLoaded1) {
    return null;
  }

  // eslint-disable-next-line no-unused-expressions
  <StatusBar hidden />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShippingAddress"
          component={ShippingAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="NewProducts"
          component={NewProducts}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
