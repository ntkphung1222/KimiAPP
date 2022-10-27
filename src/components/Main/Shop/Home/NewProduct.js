import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
//import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-elements';
//import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import getNewProduct from '../../../../api/getNewProduct';
import color from '../../../../../assets/color';
//import color from '../../../../../assets/color';

export default function NewProduct({ navigation }) {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    getNewProduct()
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // const onClickAddCart = (data) => {
  //   const itemcart = {
  //     product: data,
  //     quantity: 1,
  //     price: 10,
  //   };

  //   AsyncStorage.getItem('cart')
  //     .then((datacart) => {
  //       if (datacart != null) {
  //         const cart = JSON.parse(datacart);
  //         const item = cart.find((c) => c.product.sp_ma === data.sp_ma);
  //         //console.log(item);
  //         if (item) {
  //           item.quantity += 1;
  //         } else {
  //           cart.push(itemcart);
  //         }
  //         AsyncStorage.setItem('cart', JSON.stringify(cart)).then(() =>
  //           console.log(cart)
  //         );
  //       } else {
  //         const cart = [];
  //         cart.push(itemcart);
  //         AsyncStorage.setItem('cart', JSON.stringify(cart)).then(() =>
  //           console.log(cart)
  //         );
  //       }
  //       Alert.alert('Add thành công');
  //     })
  //     .catch((error) => {
  //       Alert.alert(error);
  //     });
  // };
  return (
    <View style={styles.container}>
      <Text style={font.textTitle1}> Sản phẩm mới nhất </Text>
      <ScrollView>
        <View
          style={{
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 20,
          }}
        >
          {serverData.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
              key={item.sp_ma}
              style={styles.itemView}
            >
              <View style={styles.newProductImageView}>
                <Image
                  resizeMode="contain"
                  style={{ flex: 1 }}
                  source={{
                    uri: item.sp_hinhanh,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 0,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Text adjustsFontSizeToFit style={styles.newProductName}>{item.sp_ten}</Text>
                <View style={styles.newProductPriceView}>
                  <NumericFormat
                    type="text"
                    value={item.sp_giaban}
                    allowLeadingZeros
                    thousandSeparator=","
                    displayType="text"
                    suffix={'đ'}
                    renderText={(formatValue) => (
                      <Text style={styles.newProductPrice}>{formatValue}</Text>
                    )}
                  />
                </View>
              </View>
              {/* <TouchableOpacity
                style={styles.newProductAddButton}
                onPress={() => onClickAddCart(item)}
              >
                <Text style={styles.newProductAddButtonText}>Thêm vào giỏ</Text>
              </TouchableOpacity> */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemW = (width - 40) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,

    //backgroundColor: color.backgroundColor
  },
  label: {
    fontSize: 18,
  },
  itemView: {
    width: itemW - 5,
    marginRight: 10,
    marginBottom: 10,
    borderColor: color.greylight,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    backgroundColor: color.white,
    //justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 1
  },
  newProductImageView: {
    flex: 1,
    height: 110,
    width: itemW - 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    overflow: 'hidden',
    //backgroundColor: color.blue,
  },
  newProductName: {
    fontFamily: 'SFProDisplaySemiBold',
    fontSize: 14,
    justifyContent: 'space-between'
  },
  newProductPriceView: {
    //alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 2,
  },
  newProductPrice: {
    fontSize: 15,
    color: color.primary,
    fontFamily: 'SFProDisplaySemiBold',
  },
 
  // newProductAddButton: {
  //   backgroundColor: color.primary,
  //   marginTop: 10,
  //   paddingVertical: 8,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // newProductAddButtonText: {
  //   color: color.white,
  //   fontFamily: 'SFProDisPlayRegular',
  //   fontSize: 18,
  // },
});
