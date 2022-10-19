/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
//import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import Header from '../Header';
import font from '../../../../../assets/font';
//import global from '../../../global';
//const { like, setLike } = useState(false);

// const Rating = ({ rating, maxRating }) => (
//   <View style={{ flexDirection: 'row' }}>
//     {Array(rating)
//       .fill(1)
//       .map(() => (
//         <FAIcon name="star" size={20} color='black' />
//       ))}
//     {Array(maxRating - rating)
//       .fill(1)
//       .map(() => (
//         <FAIcon name="star-o" size={20} color='black' />
//       ))}
//   </View>
// );
export default function ProductDetail({ navigation, route }) {
  const { product } = route.params;

  const title = 'Chi tiết sản phẩm';

  const { container, wrapper, imageView, itemImage } = styles;
  const [productDescription] = useState(
    // eslint-disable-next-line max-len
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.'
  );
  const [isFavourite, setFavourite] = useState(false);
  const [seeFullDescription, setSeeFullDescription] = useState(false);
  const [moreProducts] = useState([
    {
      productID: 1,
      productName: 'Black Printed Tshirt',
      productPrice: 19.49,
      productImage:
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    },
    {
      productID: 2,
      productName: 'Black Printed Top (Women)',
      productPrice: 19.49,
      productImage:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=90',
    },
    {
      productID: 3,
      productName: 'White Solid Tshirt',
      productPrice: 34.99,
      productImage:
        'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    },
    {
      productID: 4,
      productName: 'Black Solid Tshirt',
      productPrice: 34.99,
      productImage:
        'https://images.unsplash.com/photo-1512327428889-607eeb19efe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    },
    {
      productID: 5,
      productName: 'Red Top (Women)',
      productPrice: 44.85,
      productImage:
        'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    },
  ]);
  const onClickAddCart = (data) => {
    const itemcart = {
      product: data,
      quantity: 1,
      price: 10,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart != null) {
          const cart = JSON.parse(datacart);
          const item = cart.find((c) => c.product.sp_ma === data.sp_ma);
          //console.log(item);
          if (item) {
            item.quantity += 1;
          } else {
            cart.push(itemcart);
          }
          AsyncStorage.setItem('cart', JSON.stringify(cart)).then(() =>
            console.log(cart)
          );
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart)).then(() =>
            console.log(cart)
          );
        }
        Alert.alert('Add thành công');
      })
      .catch((error) => {
        Alert.alert(error);
      });
    };
  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <ScrollView style={wrapper}>
        <View style={imageView}>
          <Image
            style={itemImage}
            resizeMode="contain"
            source={{
              uri: product.sp_hinhanh,
            }}
          />
        </View>
        <Text style={font.textName}>{product.sp_ten}</Text>
        <View style={styles.productPriceView}>
          <Text style={styles.discountedPriceText}>$29.99</Text>
          <Text style={styles.actualPriceText}>$40.00</Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 20 }}
            onPress={() => setFavourite(!isFavourite)}
          >
            {/* <Icon name="heart" type="antdesign" size={20} color={color.red} /> */}
            <FAIcon
              name={isFavourite ? 'heart' : 'heart-o'}
              size={22}
              //color={color.red}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ marginVertical: 10 }}>
          <Rating rating={4} maxRating={5} />
        </View> */}
        <TouchableOpacity onPress={() => navigation.navigate('RatingProduct', { product })}>
          <Text>Đánh giá của bạn</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => onClickAddCart(product)}
          >
            <Text style={font.textButtonWhite}>Thêm vào giỏ</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={() => setSeeFullDescription((prev) => !prev)}
          >
            <Text style={{ fontFamily: 'SFProDisplaySemiBold', fontSize: 16 }}>
              Mô tả sản phẩm
            </Text>
            <TouchableOpacity
              onPress={() => setSeeFullDescription((prev) => !prev)}
            >
              {seeFullDescription ? (
                <Icon name="chevron-up" size={26} />
              ) : (
                <Icon name="chevron-down" size={26} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'SFProDisPlayRegular' }}>
              {seeFullDescription
                ? `${productDescription}`
                : `${productDescription.split('\n')[0]}`}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'SFProDisPlayRegular',
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{ flex: 1, flexDirection: 'row', paddingVertical: 10 }}
            >
              {moreProducts.map((item) => (
                <View key={item.productID} style={{ width: 180, marginRight: 20 }}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                        ${item.productPrice}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name="heart"
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreProductAddButton}>
                    <Text style={styles.moreProductAddButtonText}>
                      Thêm vào giỏ
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = width - 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.greylight,
  },
  wrapper: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: color.white,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  itemImage: {
    width: itemWidth - 30,
    height: 250,
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontFamily: 'SFProDisplaySemiBold', fontSize: 20 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontFamily: 'SFProDisPlayRegular',
  },
  addToCartButton: {
    backgroundColor: color.primary,
    borderRadius: 4,
    width: itemWidth,
    paddingVertical: 8,
    marginRight: 10,
  },
  productDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontFamily: 'SFProDisPlayRegular',
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
    fontFamily: 'SFProDisPlayRegular',
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductAddButton: {
    backgroundColor: color.primary,
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductAddButtonText: {
    color: color.white,
    fontFamily: 'SFProDisPlayRegular',
    fontSize: 18,
  },
});
