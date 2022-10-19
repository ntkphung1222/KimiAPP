import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
//import font from '../../../../../assets/font';

const orderArray = [
  {
    id: 1,
    date: '13/10/2022',
    name: 'ok',
    sp_hinhanh:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
    numProduct: 2,
    totalSum: '200.000đ',
    state: 'Hủy',
  },
  {
    id: 2,
    date: '13/10/2022',
    name: 'ok',
    sp_hinhanh:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
    numProduct: 2,
    totalSum: '100.000đ',
    state: 'Hủy',
  },
  {
    id: 3,
    date: '13/10/2022',
    name: 'ok',
    sp_hinhanh:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
    numProduct: 2,
    totalSum: '500.000đ',
    state: 'Hủy',
  },
];

export default function OrderCompleted({ navigation }) {
  const [listItems] = useState(orderArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.itemStyle}>
      <View style={styles.itemImageStyle}>
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{
            uri: item.sp_hinhanh,
          }}
        />
      </View>
      <View style={styles.orderInfo}>
        <Text>{item.date}</Text>
        <Text>{item.name}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={font.textBodySmall}>
            Tổng cộng ({item.numProduct} sản phẩm):
          </Text>
          <Text style={font.textPrice}>{item.totalSum} </Text>
        </View>
        <TouchableOpacity
          style={{ width: 100 }}
          onPress={() => navigation.navigate('RatingProduct')}
        >
          <Text>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        //style={wrapper}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, id) => id.toString()}
        numColumns={1}
        //ListHeaderComponent={getHeader}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  itemStyle: {
    flexDirection: 'row',
    marginTop: 10,
    width,
    padding: 20,
    backgroundColor: color.white,
  },
  itemImageStyle: {
    width: width * 0.25,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: color.black,
  },
  orderInfo: {
    paddingRight: 20,
    width: (width * 0.75) - 20,
  },
});
