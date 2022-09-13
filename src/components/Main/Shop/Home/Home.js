import React, { useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Header, SearchBar, Icon, Badge } from '@rneui/themed';
import color from '../../../../../assets/color';
//import { NavigationContainer } from '@react-navigation/native';
//import Cart from '/src/components/Main/Shop/Cart/Cart';

export default function Home() {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Header 
        //style={styles.headerContainer} 
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 30,
        }} 
        rightComponent={
          // icon: 'shopping-cart',
          // color: '#fff',
          <View>
            {/* <View style={{ posititon: 'absolute', marginLeft: 30 }}>
             <Badge value="1" status="error" />
             </View> */}
            <TouchableOpacity
            posititon='absolute'
              style={{ marginLeft: 10 }}
            >           

              <Icon name="shopping-cart" color="white" size={30} />
              
            </TouchableOpacity>
            
          </View> 
      } 
        backgroundColor={color.primary}
        
        />
      <SearchBar lightTheme placeholder="Tìm kiếm ở đây..." />
        <Text>Home</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
          <Text>Goto Login</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   headerContainer: {
//     headerContainer: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: color.primary,
//       marginBottom: 20,
//       width: '100%',
//       paddingVertical: 15,
//     },
//   }
// });
