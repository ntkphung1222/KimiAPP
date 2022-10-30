/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import Header from '../Header';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderDetail({ navigation, route }) {
  const { productList } = route.params;

  return (
    <View>
      <Header title={'Chi tiết đơn hàng'} navigation={navigation} />

      <ScrollView style={styles.wrapper}>
        {productList.map((data) => (
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
                  renderText={(formatValue) => <Text>{formatValue}</Text>}
                />
                <Text>x {data.soluong}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          {productList[0].hdx_trangthai === '0' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
                borderRadius: 15,
                backgroundColor: color.red,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
              onPress={() =>
                Alert.alert('Xác nhận muốn hủy đơn hàng?', '', [
                  { text: 'Trở về' },
                  {
                    text: 'Xác nhận',
                    // onPress: () => {
                    //   setDataCart([]);
                    //   AsyncStorage.removeItem('cart');
                    // },
                  },
                ])
              }
            >
              <Text style={{ color: color.white }}>Hủy</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: color.primary,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontStyle: 'italic' }}>
                {productList[0].hdx_trangthai === '-1'
                  ? 'Đã hủy'
                  : productList[0].hdx_trangthai === '1'
                  ? 'Đang xử lý'
                  : productList[0].hdx_trangthai === '2'
                  ? 'Đang giao'
                  : 'Đã giao'}
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginTop: 40,
            }}
          >
            <Text>Mã đơn hàng:</Text>
            <Text>{productList[0].hdx_ma}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}
          >
            <Text>Thời gian đặt hàng:</Text>
            <Text>{productList[0].created_at}</Text>
          </View>
          <View
            style={{
              //paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={font.textBodySmall}>
              {productList[0].hdx_soluong} sản phẩm
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text style={font.textBodySmall}> Thành tiền :</Text>
              <NumericFormat
                type="text"
                value={productList[0].hdx_tongtien}
                allowLeadingZeros
                thousandSeparator=","
                displayType="text"
                suffix={'đ'}
                renderText={(formatValue) => (
                  <Text style={font.textPrice}>{formatValue}</Text>
                )}
              />
            </View>
          </View>
        </View>
        {/* <Text>{JSON.stringify(productList[0])} </Text> */}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    backgroundColor: color.white,
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
