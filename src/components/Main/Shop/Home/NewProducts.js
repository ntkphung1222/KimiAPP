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

export default function NewProducts({ navigation }) {
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
        <Text style={styles.itemText}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Sản phẩm mới nhất </Text>
      <FlatList
        data={listItems}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        showsHorizontalScrollIndicator={false}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 40 - 5) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  item: {
    width: itemWidth,
    //paddingHorizontal: 5,
    //height: itemWidth + 100,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  itemImage: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 6,
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
});
