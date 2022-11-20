import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/components/Authentication/Authentication';
import Signin from './src/components/Authentication/Signin';
import Signup from './src/components/Authentication/Signup';
import ForgotPassword from './src/components/Authentication/ForgotPassword';
import Order from './src/components/Main/Shop/Order/Order';
import ChangeInfo from './src/components/Main/Shop/Account/ChangeInfo';
import Favorite from './src/components/Main/Shop/Account/Favorite';

import Main from './src/components/Main/Main';
import OrderHistory from './src/components/Main/Shop/Order/OrderHistory';
import Cart from './src/components/Main/Shop/Cart/Cart';
import Payment from './src/components/Main/Shop/Cart/Payment';
import Success from './src/components/Main/Shop/Cart/Success';
import ShippingAddress from './src/components/Main/Shop/ShippingAddress/ShippingAddress';
import AddShippingAddress from './src/components/Main/Shop/ShippingAddress/AddShippingAddress';
import EditShippingAddress from './src/components/Main/Shop/ShippingAddress/EditShippingAddress';

import Account from './src/components/Main/Shop/Account/Account';
import ChangePassword from './src/components/Main/Shop/ChangePassword/ChangePassword';

import Products from './src/components/Main/Shop/Products/Products';
import ProductDetail from './src/components/Main/Shop/ProductDetail/ProductDetail';
//import NewProducts from './src/components/Main/Shop/Home/NewProducts';
//import Home from './src/components/Main/Shop/Home/Home';
import Category from './src/components/Main/Shop/Home/Category';
import Post from './src/components/Main/Shop/Post/Post';
import PostDetail from './src/components/Main/Shop/Post/PostDetail';

import RatingProduct from './src/components/Main/Shop/RatingProduct/RatingProduct';
import Search from './src/components/Main/Shop/Search/Search';
import Info from './src/components/Main/Shop/Account/Info';
import Shop from './src/components/Main/Shop/Shop';
import Chat from './src/components/Main/Shop/Chat/Chat';
import OrderDetail from './src/components/Main/Shop/Order/OrderDetail';
import AllRatingByProduct from './src/components/Main/Shop/ProductDetail/AllRatingByProduct';
import Home from './src/components/Main/Shop/Home/Home';
import MyRating from './src/components/Main/Shop/MyRating/MyRating';
import ModalMessage from './src/components/ModalMessage';
//import global from './src/components/global';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        // eslint-disable-next-line global-require
        // SFProDisPlayRegular: require('./assets/fonts/SF-Pro-Display-Regular.otf'),
        // eslint-disable-next-line global-require
        SFProDisplaySemiBold: require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    });
    // const [fontsLoaded2] = useFonts({
    //   // eslint-disable-next-line global-require
    //   SFProDisplaySemiBoldItalic: require('./assets/fonts/SF-Pro-Display-SemiboldItalic.otf'),
    // });

    const [fontsLoaded1] = useFonts({
        // eslint-disable-next-line global-require
        SFProDisPlayRegular: require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    });

    if (!fontsLoaded || !fontsLoaded1) {
        return null;
    }

    // eslint-disable-next-line no-unused-expressions

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Shop"
                    component={Shop}
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
                    name="AddShippingAddress"
                    component={AddShippingAddress}
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
                    name="AllRatingByProduct"
                    component={AllRatingByProduct}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Post"
                    component={Post}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PostDetail"
                    component={PostDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Category"
                    component={Category}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OrderHistory"
                    component={OrderHistory}
                    options={{ headerShown: false }}
                />
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
                <Stack.Screen
                    name="Info"
                    component={Info}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signin"
                    component={Signin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Order"
                    component={Order}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Success"
                    component={Success}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RatingProduct"
                    component={RatingProduct}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={{ headerShown: false }}
                />
                {/* <Stack.Screen
          name="Chat1"
          component={Chat1}
          options={{ headerShown: false }}
        /> */}
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="OrderDetail"
                    component={OrderDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Favorite"
                    component={Favorite}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyRating"
                    component={MyRating}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditShippingAddress"
                    component={EditShippingAddress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ModalMessage"
                    component={ModalMessage}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
