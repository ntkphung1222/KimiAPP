import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  //Dimensions,
  Image,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import momo from '../../../../images/momo.png';
import cod from '../../../../images/cod.png';
import color from '../../../../../assets/color';

export default function Payment({ navigation, route }) {
  const { dataCart } = route.params;
  const [value, setValue] = useState('first');
  const {
    label,
    imageIcon,
    radioButton,
    productView,
    productImage,
    productTop,
    productBottom,
    productRight,
  } = styles;
  const {
    container,
    header,
    wrapper,
    headerIcon,
    headerTitle,
    shippingAddressContainer,
    shippingAddress,
    paymentmethodContainer,
    paymentmethod,
  } = styles;
  const onLoadToTal = () => {
    let total = 0;
    const cart = dataCart;
    for (let i = 0; i < cart.length; i++) {
      total += (cart[i].price * cart[i].quantity);
    }
    return total;
  };
  return (
    <View style={container}>
      <View style={header}>
        <TouchableOpacity
          style={headerIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="angle-left"
            type="font-awesome"
            size={30}
            color={color.white}
          />
        </TouchableOpacity>
        <Text style={headerTitle}>Kiểm tra</Text>
      </View>
      <View style={{ flex: 0.7 }}>
        <ScrollView style={wrapper} showsVerticalScrollIndicator={false}>
          <View style={shippingAddressContainer}>
            <Text style={label}> Địa chỉ nhận hàng</Text>
            <TouchableOpacity
              style={shippingAddress}
              onPress={() => navigation.navigate('ShippingAddress')}
            >
              <Icon name="location-pin" size={35} color={color.red} />
              <View>
                <Text>Kim Phung</Text>
                <Text>0989415460</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={label}>Danh sách sản phẩm</Text>
          {dataCart.map((item) => (
            <View key={item.product.sp_ma} style={productView}>
              <Image style={productImage} source={{ uri: item.product.sp_hinhanh }} />
              <View style={productRight}>
                <Text style={productTop}>{item.product.sp_ten}</Text>
                <View style={productBottom}>
                  <Text>Giá: {item.price}</Text>
                  <Text>SL: {item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.subtotalView}>
            <Text style={styles.subtotalText}>Tổng tiền -</Text>
            <Text style={styles.subtotalPrice}>
              {onLoadToTal()}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.3,
          paddingHorizontal: 20,
          borderColor: color.borderSecond,
          borderWidth: 1,
          backgroundColor: color.white,
        }}
      >
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={paymentmethodContainer}>
            <Text style={label}> Chọn phương thức thanh toán</Text>
            <TouchableOpacity style={paymentmethod}>
              <Image source={cod} style={imageIcon} />
              <Text>Thanh toán khi nhận hàng</Text>
              <RadioButton value="first" style={radioButton} />
            </TouchableOpacity>
          </View>
          {/* <View style={paymentmethodContainer}> */}
          <TouchableOpacity style={paymentmethod}>
            <Image source={momo} style={imageIcon} />
            <Text style={{ justifyContent: 'center' }}>Ví điện tử MoMo</Text>
            <RadioButton value="second" style={radioButton} />
          </TouchableOpacity>
          {/* </View> */}
        </RadioButton.Group>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: color.primary,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-start',
    backgroundColor: color.primary,
  },
  headerIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  wrapper: {
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  shippingAddressContainer: {
    height: 100,
  },
  label: {
    fontSize: 16,
    margin: 5,
  },
  shippingAddress: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.borderSecond,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 60,
  },
  subtotalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
  paymentmethodContainer: {},
  paymentmethod: {
    borderColor: color.borderSecond,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'space-between',
    //alignContent: 'center',
  },
  imageIcon: {
    width: 35,
    height: 35,
    // alignItems: 'flex-end'
  },
  productView: {
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productRight: { paddingLeft: 5 },
  productTop: {
    height: 70,
    paddingVertical: 5,
  },
  productBottom: {
    flexDirection: 'row',
    width: 200,
    height: 30,
    //backgroundColor: color.text,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  paymentViewFooter: {
    flex: 0.3,
    backgroundColor: color.white,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 0,
  },
  checkoutButton: {
    backgroundColor: color.primary,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: color.white,
    fontWeight: '700',
  },
});
