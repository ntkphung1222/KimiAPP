import * as React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed';

//import { NavigationContainer } from '@react-navigation/native';
//import Cart from '/src/components/Main/Shop/Cart/Cart';

export default function Home() {
  return (
    <SafeAreaView>
      <View>
      <SearchBar placeholder="Tìm kiếm ở đây..." />
        <Text>Home</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
          <Text>Goto Login</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
