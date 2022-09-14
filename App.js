import * as React from 'react';
//import { SafeAreaView } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/components/Authentication/Authentication';
import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
import Main from './src/components/Main/Main';
import OrderHistory from './src/components/OrderHistory/OrderHistory';
import Cart from './src/components/Main/Shop/Cart/Cart';
import Contact from './src/components/Main/Shop/Contact/Contact';
import Products from './src/components/Main/Shop/Home/Products';

const Stack = createNativeStackNavigator();

export default function App() {
  // 'PoppinsBold' : require('./assets/fonts/Poppins-Bold.ttf')

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
        <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Products" component={Products} />

        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
