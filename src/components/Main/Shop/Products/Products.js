import React, { useState, useEffect } from 'react';

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
//const title = 'Sản phẩm';

export default function Products({ navigation, route }) {
  const cate = route.params.cate;
  const titleCate = route.params.titleCate;
  const { container, wrapper } = styles;
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`http://kimimylife.site/api/product?category=${cate}`)
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //const [listItems] = useState(dummyArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { product: item.sp_ma })}
    >
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.sp_hinhanh }}
      />
      <View style={styles.itemFooter}>
        <Text style={styles.itemName}>{item.sp_ten}</Text>
        <Text style={styles.itemText}>{item.sp_ten}</Text>
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
      <Header navigation={navigation} title={titleCate} />
      <FlatList
        data={serverData}
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
    elevation: 1,
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
    color: color.white,
    //fontWeight: '700',
  },
});
