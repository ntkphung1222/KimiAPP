import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Header from '../Header';

export default function ProductDetail({ navigation, route }) {
  const product = route.params.product;
  const title = 'Chi tiết sản phẩm';

  const { container, wrapper, imageView, itemImage } = styles;

  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View style={imageView}>
          <Image
            style={itemImage}
            resizeMode="contain"
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
            }}
          />
        </View>
        <Text>Detail</Text>
        <Text>{product}</Text>
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const itemWidth = width - 40 - 5;
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
    
    width: itemWidth - 20,
    height: itemWidth - 20,
  },
});
