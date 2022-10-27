import React, { useEffect, useState } from 'react';
import {
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  //StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Badge } from 'react-native-elements';
import color from '../../../../../assets/color';
import Banner from './Banner';
import Category from './Category';
import NewProduct from './NewProduct';
//import global from '../../../global';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);

  const loadData = () => {
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        const cartS = JSON.parse(cart);
        setDataCart(cartS);
        setCount(dataCart.length);
      }
    });
  };
  useEffect(() => {
    //StatusBar.setHidden(true);
    // eslint-disable-next-line no-undef
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    AsyncStorage.getItem('user').then((userR) => {
      if (userR !== null) {
        const userCurrent = JSON.parse(userR);
        setUser(userCurrent);
      }
    });
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        const cartS = JSON.parse(cart);
        setDataCart(cartS);
        setCount(dataCart.length);
      }
    });
  }, []);
 
  //const BadgedIcon = withBadge(count)(Icon);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);
  const { container } = styles;
  return (
    <View style={container}>
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          marginTop: 22,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: color.primary,
        }}
      >
        <Text
          style={{
            color: color.white,
            fontFamily: 'SFProDisplaySemiBold',
            fontSize: 18,
          }}
        >
          Xin chào, {user.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon type="feather" name="search" color={color.white} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}
          >
            <Badge
              style={{}}
              status="error"
              value={count}
              containerStyle={{ position: 'absolute', top: -10, right: -12 }}
            />
            <Icon
              type="feather"
              name="shopping-cart"
              color={color.white}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: color.backgroundColor }}
      >
        <Banner />
        <Category navigation={navigation} />
        <NewProduct navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  searchContainer: {
    //backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 50,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: color.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 6,
  },
  textSearch: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: color.text,
  },
});
