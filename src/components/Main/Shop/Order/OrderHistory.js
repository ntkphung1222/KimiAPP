/* eslint-disable no-nested-ternary */
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
  TextInput,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderProcessing({ navigation, route }) {
  try {
    const { user } = route.params;
    const [search, setSearch] = useState('');
    const [serverData, setServerData] = useState({});
    const [masterDataSource, setMasterDataSource] = useState();
    useEffect(() => {
      // eslint-disable-next-line no-undef
      fetch(`http://kimimylife.site/api/orderhistory?hdx_kh=${user.id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          setServerData(responseJson.results);
          setMasterDataSource(responseJson.results);
          //console.log(Object.keys(responseJson.results).length);
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }, []);
    const searchFilterFunction = (text) => {
      setSearch(text);
    };
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(serverData).length > 0 ? (
          <ScrollView style={styles.container}>
            <View>
              {/* <Text>{JSON.stringify(masterDataSource)}</Text> */}
              <TextInput
                placeholder="Tìm kiếm đơn hàng"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                style={{
                  borderWidth: 1,
                  borderColor: color.primary,
                  backgroundColor: color.white,
                  padding: 5,
                  height: 45,
                  paddingHorizontal: 10,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 30, top: 20 }}
                //onPress={() => navigation.navigate('Search')}
              >
                <Icon
                  type="feather"
                  name="search"
                  color={color.primary}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {Object.entries(serverData)
              .sort(() => -1)
              .map(([i, value]) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderDetail', {
                      productList: value.data,
                    })
                  }
                  key={i}
                  style={{
                    marginBottom: 10,
                    paddingBottom: 80,
                    backgroundColor: color.white,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 2,
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      borderBottomWidth: 0.5,
                      borderBottomColor: color.greylight,
                    }}
                  >
                    <Text>Mã đơn hàng</Text>
                    <Text style={{ fontStyle: 'italic' }}>#{i}</Text>
                  </View>
                  {/* <Text>console.log{JSON.stringify(serverData)}</Text> */}
                  {value.data.map((data) => (
                    <View key={data.hdxct_ma} style={styles.itemStyle}>
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
                        <Text>{data.sp_ten}</Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            paddingHorizontal: 10,
                            width: width * 0.7,
                            //backgroundColor: '#333',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <NumericFormat
                            type="text"
                            value={data.dongia}
                            allowLeadingZeros
                            thousandSeparator=","
                            displayType="text"
                            suffix={'đ'}
                            renderText={(formatValue) => (
                              <Text>{formatValue}</Text>
                            )}
                          />
                          <Text>x {data.soluong}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 40,
                      right: 20,
                      borderRadius: 10,
                      borderColor: color.primary,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontStyle: 'italic' }}>
                      {value.trangthai === '0'
                        ? 'Chờ xác nhận'
                        : value.trangthai === '1'
                        ? 'Đang xử lý'
                        : value.trangthai === '2'
                        ? 'Đang giao'
                        : value.trangthai === '3'
                        ? 'Đã giao'
                        : 'Đã hủy'}
                    </Text>
                  </View>

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 20,
                      left: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={font.textBodySmall}>
                      {value.soluong} sản phẩm
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}
                    >
                      <Text style={font.textBodySmall}> Thành tiền :</Text>
                      <NumericFormat
                        type="text"
                        value={value.thanhtien}
                        allowLeadingZeros
                        thousandSeparator=","
                        displayType="text"
                        suffix={'đ'}
                        renderText={(formatValue) => (
                          <Text style={font.textPrice}>{formatValue}</Text>
                        )}
                      />
                      {/* <Text style={font.textPrice}>{data.hdx_tongtien} </Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyView}>
            <Text style={font.textTitle1}>Bạn chưa có đơn hàng nào. </Text>
          </View>
        )}
      </View>
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
    borderBottomWidth: 0.5,
    borderBottomColor: color.borderSecond,
    width,
    padding: 10,
    //paddingBottom: 30,
  },
  itemImageStyle: {
    width: width * 0.25,
  },
  itemImage: {
    width: 90,
    height: 90,
    elevation: 1,
    borderRadius: 8,
  },
  orderInfo: {
    paddingHorizontal: 10,
    width: width * 0.73,
    height: 90,
  },
  emptyView: {
    flex: 1,
    marginTop: 140,
  },
});
