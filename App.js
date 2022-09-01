import * as React from 'react';
//import { View, Text } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/components/Authentication/Authentication';
import ChangeInfo from './src/components/ChangeInfo/ChangeInfo';
import Main from './src/components/Main/Main';
import OrderHistory from './src/components/OrderHistory/OrderHistory';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
