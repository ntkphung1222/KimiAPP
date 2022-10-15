import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useHeaderHeight } from '@react-navigation/elements';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

const Cart = ({ navigation }) => {
  const [dataCart, setDataCart] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        const cartS = JSON.parse(cart);
        setDataCart(cartS);
        //AsyncStorage.removeItem('cart');
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataCart.map((item) => (
            <View key={item.product.sp_ma} style={styles.itemView}>
              <Image
                style={styles.imageView}
                resizeMode="contain"
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
                }}
              />
              <View style={styles.rightItemView}>
                <Text>{item.product.sp_ten}</Text>
                {/* <Text>{JSON.stringify(item)}</Text> */}
                <View style={styles.bottomView}>
                  <Text>{item.product.sp_soluong}</Text>

                  <View style={styles.quantityView}>
                    <TouchableOpacity
                      onPress={() => {
                        const newProd = {
                          ...item,
                          quantity: item.quantity + 1,
                          price: item.price + item.perPrice,
                        };
                        const restProds = dataCart.filter(
                          (p) => p.product.sp_ma !== item.product.sp_ma
                        );
                        setDataCart([...restProds, newProd]);
                      }}
                    >
                      <Icon
                        style={styles.toggleCounterButton}
                        name="plus-circle"
                        type="font-awesome"
                      />
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.quantity === 1) {
                          return Alert.alert(
                            `Remove ${item.product.sp_ten}?`,
                            '',
                            [
                              { text: 'Cancel' },
                              {
                                text: 'Remove',
                                onPress: () => {
                                  const newCart = dataCart.filter(
                                    (p) =>
                                      p.product.sp_ma !== item.product.sp_ma
                                  );
                                  setDataCart(newCart);
                                },
                              },
                            ]
                          );
                        }
                        const newProd = {
                          ...item,
                          quantity: item.quantity - 1,
                          //price: product.price - product.perPrice,
                        };
                        const restProds = dataCart.filter(
                          (p) => p.product.sp_ma !== item.product.sp_ma
                        );
                        setDataCart([...restProds, newProd]);
                      }}
                    >
                      <Icon
                        style={styles.toggleCounterButton}
                        name="minus-circle"
                        type="font-awesome"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem('cart');
            }}
          >
            <Text>Thanh Toán</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default Cart;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: color.primary,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: color.primary,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: color.white,
    //marginTop: 10,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    paddingHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  itemView: {
    backgroundColor: color.blue,
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageView: {
    width: (width - 40) * 0.3,
    height: (width - 40) * 0.3,
  },
  rightItemView: {
    width: (width - 40) * 0.7,
    justifyContent: 'space-between',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: color.black,
  },
  quantityView: {
    flexDirection: 'row',
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
  },
});
