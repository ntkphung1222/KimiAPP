import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderProcessing() {
  const [serverData, setServerData] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('user').then((userR) => {
      //console.log(userR);
      if (userR !== null) {
        const userCurrent = JSON.parse(userR);
        setUser(userCurrent);
      }
    });
    load();
  }, []);
  const load = async () => {
    await // eslint-disable-next-line no-undef
    fetch(`http://kimimylife.site/api/orderhistory?hdx_kh=${user.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity style={styles.itemStyle}>
      <View style={styles.itemImageStyle}>
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{
            uri: item.sp_hinhanh,
          }}
        />
      </View>
      <View style={styles.orderInfo}>
        <Text>{item.ten}</Text>
        <Text>{item.sp_ten}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={font.textBodySmall}>
            Tổng cộng ({item.soluong} sản phẩm):
          </Text>
          <Text style={font.textPrice}>{item.totalSum} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={serverData}
        //style={wrapper}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.hdx_ma}
        numColumns={1}
        //ListHeaderComponent={getHeader}
      /> */}
      <Text>{console.log(serverData)}</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  itemStyle: {
    flexDirection: 'row',
    marginTop: 10,
    width,
    padding: 20,
    backgroundColor: color.white,
  },
  itemImageStyle: {
    width: width * 0.25,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: color.black,
  },
  orderInfo: {
    paddingRight: 20,
    width: width * 0.75 - 20,
  },
});
