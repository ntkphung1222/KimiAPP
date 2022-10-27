import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  //FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderHistory() {
  try {
    const [serverData, setServerData] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
      // eslint-disable-next-line no-undef
      fetch(`http://kimimylife.site/api/orderhistory?hdx_kh=9`)
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          setServerData(responseJson.results);
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }, []);
    useEffect(() => {
      AsyncStorage.getItem('user').then((userR) => {
        //console.log(userR);
        if (userR !== null) {
          const userCurrent = JSON.parse(userR);
          setUser(userCurrent);
        }
      });
    }, []);
    return (
      <ScrollView style={styles.container}>
        {serverData.map((item) =>
          item.map((data) => (
            <TouchableOpacity key={data.hdxct_ma} style={styles.itemStyle}>
              <View style={styles.itemImageStyle}>
                <Image
                  style={styles.itemImage}
                  resizeMode="contain"
                  source={{
                    uri: data.sp_hinhanh,
                  }}
                />
              </View>
              <View style={styles.orderInfo}>
                <Text>{data.ten}</Text>
                <Text>{data.sp_ten}</Text>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                >
                  <Text style={font.textBodySmall}>
                    Tổng cộng ({data.soluong} sản phẩm):
                  </Text>
                  <Text style={font.textPrice}>{data.totalSum} </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    );
  } catch (ex) {
    console.log(ex);
  }
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
    width: (width * 0.75) - 20,
  },
});
