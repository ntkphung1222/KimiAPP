import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
//import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-elements';
//import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import getNewProduct from '../../../../api/getNewProduct';
//import color from '../../../../../assets/color';

export default function NewProduct({ navigation }) {
  const [serverData, setServerData] = useState([]);
  const [isFavourite, setFavourite] = useState(false);

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {serverData.map((item) => (
            <View key={item.sp_ma} style={{ width: 150, marginRight: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
                style={styles.newProductImageView}
              >
                <Image
                  resizeMode="contain"
                  style={{ flex: 1 }}
                  source={{
                    uri: item.sp_hinhanh,
                  }}
                />
              </TouchableOpacity>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.newProductName}>{item.sp_ten}</Text>
                <View style={styles.newProductPriceView}>
                  <Text style={styles.newProductPrice}>${item.sp_soluong}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => setFavourite(!isFavourite)}
                    >
                      {/* <Icon name="heart" type="antdesign" size={20} color={color.red} /> */}
                      <FAIcon
                        name={isFavourite ? 'heart' : 'heart-o'}
                        size={18}
                        //color={color.red}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity
                style={styles.newProductAddButton}
                onPress={() => onClickAddCart(item)}
              >
                <Text style={styles.newProductAddButtonText}>Thêm vào giỏ</Text>
              </TouchableOpacity> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    //backgroundColor: color.white
  },
  label: {
    fontSize: 18,
  },
  newProductImageView: {
    flex: 1,
    height: 150,
    width: 150,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  newProductName: {
    fontFamily: 'SFProDisplaySemiBold',
    fontSize: 16,
  },
  newProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  newProductPrice: {
    fontSize: 16,
    fontFamily: 'SFProDisplaySemiBold',
  },
  newProductIcon: {
    marginLeft: 10,
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
