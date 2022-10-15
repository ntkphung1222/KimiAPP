/* eslint-disable camelcase */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import Header from '../Header';
//import global from '../../../global';
//const { like, setLike } = useState(false);
export default function ProductDetail({ navigation, route }) {
  const { product } = route.params;

  const title = 'Chi tiết sản phẩm';

  const { container, wrapper, imageView, itemImage, addToCartButton } = styles;
  // const addThisProductToCart = () => {
  //   global.addProductToCart(product);
  // };
  // eslint-disable-next-line no-shadow
  // const onClickAddCart = (data) => {
  //   const itemcart = {
  //     product: data,
  //     quantity: 1,
  //     price: 10
  //   };

  //   AsyncStorage.getItem('cart')
  //     .then((datacart) => {
  //       if (datacart != null) {
  //         const cart = JSON.parse(datacart);
  //         cart.push(datacart);
  //         AsyncStorage.setItem('cart', JSON.stringify(cart));
  //       } else {
  //         const cart = [];
  //         cart.push(itemcart);
  //         AsyncStorage.setItem('cart', JSON.stringify(cart));
  //       }
  //       Alert.alert('Add thành công');
  //     })
  //     .catch((error) => {
  //       Alert.alert(error);
  //     });
  // };
  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View style={imageView}>
          <TouchableOpacity
            style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => {}}
          >
            {/* <Icon name="heart" type="antdesign" size={20} color={color.red} /> */}
            <Icon
              name="heart"
              type="antdesign"
              size={20}
              color={color.greylight}
            />
          </TouchableOpacity>
          <Image
            style={itemImage}
            resizeMode="contain"
            source={{
              uri: product.sp_hinhanh,
            }}
          />
        </View>
        <Text>{product.sp_ten}</Text>
        <TouchableOpacity
          style={addToCartButton}
          //onPress={() => onClickAddCart(product)}
        >
          <Text>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const itemWidth = width - 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  imageView: {
    paddingVertical: 20,
    backgroundColor: 'white',
    width: itemWidth,
    height: itemWidth,
  },
  itemImage: {
    width: itemWidth - 30,
    height: itemWidth - 30,
  },
  addToCartButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
