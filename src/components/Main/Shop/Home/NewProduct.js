import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import getNewProduct from '../../../../api/getNewProduct';

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
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.itemImageView}>
        {/* <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 10 }}
        >
          <Icon name="heart" type="antdesign" size={15} color={color.red} />
        </TouchableOpacity> */}
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{ uri: item.sp_hinhanh }}
        />
      </View>

      <View style={styles.itemFooter}>
        <Text style={font.textName}>{item.sp_ten}</Text>
        <Text style={font.textPrice}>{item.sp_ten}</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => onClickAddCart(item)}
      >
        <Text>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
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
          // const item = cart.find((c) => c.product.sp_ma === data.product.sp_ma);
          // if (item) {
          //   item.quantity += 1;
          // } else {
            cart.push(itemcart);
         // }
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
        Alert.alert('Add thành công');
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={font.textTitle1}> Sản phẩm mới nhất </Text>
      <FlatList
        data={serverData}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 40 - 5) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingHorizontal: 20,
    //backgroundColor: color.white
  },
  label: {
    fontSize: 18,
  },
  item: {
    width: itemWidth,
    padding: 7,
    elevation: 1,
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 6,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  itemImageView: {
    width: itemWidth,
    paddingHorizontal: 7,
  },
  itemImage: {
    width: itemWidth - 14,
    height: itemWidth,
  },
  itemFooter: {
    padding: 5,
    width: itemWidth,
  },
  itemName: {
    paddingVertical: 5,
    height: 50,
    //backgroundColor: '#333',
  },
  itemText: {
    // fontSize: 16,
    height: 30,
    paddingVertical: 5,
    //backgroundColor: '#FAD',
  },
  addToCartButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
