import React, { useState } from 'react';

import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import color from '../../../../../assets/color';
import Header from '../Header';

const numColumns = 2;
const title = 'Sản phẩm';

const dummyArray = [
  {
    id: '1',
    value: 'A',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '2',
    value: 'B',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '3',
    value: 'C',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '4',
    value: 'D',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '5',
    value: 'E',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '6',
    value: 'F',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '7',
    value: 'G',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '8',
    value: 'H',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '9',
    value: 'I',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '10',
    value: 'J',
    name: 'abc',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
];

export default function Products({ navigation, route }) {
  const cate = route.params.cate;
  const name = route.params.name;
  const { container, wrapper } = styles;
  const [listItems] = useState(dummyArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { product: item.id })}
    >
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.image }}
      />
      <View style={styles.itemFooter}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemText}>{item.value}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <Text>{cate}</Text>
      <Text>{name}</Text>
      <FlatList
        data={listItems}
        style={wrapper}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        maxToRenderPerBatch={4}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        //ListHeaderComponent={getHeader}
      />
    </View>
  );
}
const { width } = Dimensions.get('window');
const itemWidth = (width - 40 - 5) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  item: {
    width: itemWidth,
    padding: 5,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  itemImage: {
    backgroundColor: color.white,
    width: itemWidth - 10,
    height: itemWidth,
  },
  itemFooter: {
    paddingHorizontal: 5,
    width: itemWidth,
  },
  itemName: {
    paddingVertical: 5,
    height: 50,
  },
  itemText: {
    height: 30,
    paddingVertical: 5,
  },
  addToCartButton: {
    backgroundColor: color.primary,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  addToCartButtonText: {
    //fontSize: 18,
    color: '#fff',
    //fontWeight: '700',
  },
});
