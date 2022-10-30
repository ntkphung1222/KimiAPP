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
import { NumericFormat } from 'react-number-format';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

export default function OrderProcessing({ route }) {
  try {
    const [serverData, setServerData] = useState({});
    const { user } = route.params;
    useEffect(() => {
      // eslint-disable-next-line no-undef
      fetch(`http://kimimylife.site/api/orderhistory?hdx_kh=${user.id}`)
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          setServerData(responseJson.results);
          //console.log(Object.keys(responseJson.results).length);
        })
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }, []);
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(serverData).length > 0 ? (
          <ScrollView style={styles.container}>
            {Object.entries(serverData)
              .sort(() => -1)
              .map(([i, value]) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    // borderBottomColor: color.greylight,
                    // borderTopColor: color.greylight,
                    // borderWidth: 1,
                    marginBottom: 10,
                    paddingBottom: 40,
                    backgroundColor: color.white,
                  }}
                >
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
                          <Text>SL: {data.soluong}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
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
