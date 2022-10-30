import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

// const wait = (timeout) =>
//   new Promise((resolve) => setTimeout(resolve, timeout));

function Cart({ navigation }) {
  const [dataCart, setDataCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const loadData = () => {
    AsyncStorage.getItem('cart').then((cart) => {
      if (cart !== null) {
        const cartS = JSON.parse(cart);
        setDataCart(cartS);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  const onLoadToTal = () => {
    let total = 0;
    const cart = dataCart;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].product.sp_giaban * cart[i].quantity;
    }
    return total;
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity
          onPress={() => {
            if (dataCart.length !== 0) {
              Alert.alert('Bạn muốn xóa tất cả sản phẩm trong giỏ hàng?', '', [
                { text: 'Trở về' },
                {
                  text: 'Xóa',
                  onPress: () => {
                    setDataCart([]);
                    AsyncStorage.removeItem('cart');
                  },
                },
              ]);
            }
          }}
        >
          <Icon type="feather" name="trash-2" size={22} color={color.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.cartContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {dataCart.length > 0 ? (
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {dataCart
                  .sort((a, b) => a.product.sp_ten > b.product.sp_ten)
                  .map((item, i) => (
                    <View key={item.product.sp_ma} style={styles.itemView}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ProductDetail', {
                            product: item.product,
                          })
                        }
                      >
                        <Image
                          style={styles.imageView}
                          resizeMode="contain"
                          source={{
                            uri: item.product.sp_hinhanh,
                          }}
                        />
                      </TouchableOpacity>

                      <View style={styles.rightItemView}>
                        <View style={styles.rightTopView}>
                          <Text style={{ width: width * 0.6 }}>
                            {item.product.sp_ten}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                // `Xóa ${item.product.sp_ten} khỏi giỏ hàng?`,
                                'Xóa sản phẩm này khỏi giỏ hàng?',
                                '',
                                [
                                  { text: 'Trở về' },
                                  {
                                    text: 'Xóa',
                                    onPress: () => {
                                      dataCart.splice(i, 1);
                                      AsyncStorage.setItem(
                                        'cart',
                                        JSON.stringify(dataCart)
                                      ).then(() => {
                                        setDataCart(dataCart);
                                        loadData();
                                      });
                                    },
                                  },
                                ]
                              )
                            }
                          >
                            <Icon
                              type="feather"
                              name="trash-2"
                              size={20}
                              color={color.red}
                            />
                          </TouchableOpacity>
                        </View>
                        {/* <Text>{JSON.stringify(dataCart)}</Text> */}
                        <View style={styles.bottomView}>
                          <NumericFormat
                            type="text"
                            value={item.product.sp_giaban}
                            allowLeadingZeros
                            thousandSeparator=","
                            displayType="text"
                            suffix={'đ'}
                            renderText={(formatValue) => (
                              <Text>{formatValue}</Text>
                            )}
                          />
                          <View style={styles.quantityView}>
                            <TouchableOpacity
                              onPress={() => {
                                if (item.quantity === 1) {
                                  return Alert.alert(
                                    `Xóa ${item.product.sp_ten} khỏi giỏ hàng?`,
                                    '',
                                    [
                                      { text: 'Trở về' },
                                      {
                                        text: 'Xóa',
                                        onPress: () => {
                                          const newCart = dataCart.filter(
                                            (p) =>
                                              p.product.sp_ma !==
                                              item.product.sp_ma
                                          );
                                          setDataCart(newCart);
                                          AsyncStorage.setItem(
                                            'cart',
                                            JSON.stringify(dataCart)
                                          ).then();
                                        },
                                      },
                                    ]
                                  );
                                }
                                dataCart[i].quantity -= 1;
                                setDataCart(dataCart);
                                AsyncStorage.setItem(
                                  'cart',
                                  JSON.stringify(dataCart)
                                ).then(() => loadData());
                              }}
                            >
                              <Icon
                                style={styles.toggleCounterButton}
                                name="minus-circle"
                                type="font-awesome"
                                color="gray"
                              />
                            </TouchableOpacity>
                            <Text>{item.quantity}</Text>
                            <TouchableOpacity
                              onPress={() => {
                                dataCart[i].quantity += 1;
                                setDataCart(dataCart);
                                AsyncStorage.setItem(
                                  'cart',
                                  JSON.stringify(dataCart)
                                ).then(() => loadData());
                              }}
                            >
                              <Icon
                                style={styles.toggleCounterButton}
                                name="plus-circle"
                                type="font-awesome"
                                color="gray"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
              </ScrollView>
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>Tổng tiền -</Text>
                <NumericFormat
                  type="text"
                  value={onLoadToTal()}
                  allowLeadingZeros
                  thousandSeparator=","
                  displayType="text"
                  suffix={'đ'}
                  renderText={(formatValue) => (
                    <Text style={styles.subtotalPrice}>{formatValue}</Text>
                  )}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => navigation.navigate('Payment', { dataCart })}
              >
                <Text style={styles.textButton}>THANH TOÁN</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Icon
                name="inbox"
                type="antdesign"
                size={150}
                color={color.greylight}
              />
              <Text style={font.textTitle1}>Giỏ hàng trống.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default Cart;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  header: {
    marginTop: 22,
    flexDirection: 'row',
    height: 50,
    backgroundColor: color.primary,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: color.backgroundColor,
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
    width,
    backgroundColor: color.white,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: color.line,
  },
  imageView: {
    width: (width - 40) * 0.3,
    height: (width - 40) * 0.3,
    borderRadius: 8,
    //backgroundColor: color.blue
  },
  rightItemView: {
    width: (width - 40) * 0.7,
    justifyContent: 'space-between',
    padding: 5,
  },
  rightTopView: {
    flexDirection: 'row',
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
  toggleCounterButton: {
    paddingHorizontal: 10,
  },
  emptyCartView: {
    flex: 1,
    marginTop: 140,
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 25,
    //flex: 0.2,
    width: width - 40,
    marginHorizontal: 20,
    right: 0,
    bottom: 0,
  },
  textButton: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subtotalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
});
