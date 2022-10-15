/* eslint-disable camelcase */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import Header from '../Header';

//const { like, setLike } = useState(false);
export default function ProductDetail({ navigation, route }) {
  const { sp_hinhanh, sp_ten } = route.params.product;
  
  const title = 'Chi tiết sản phẩm';

  const { container, wrapper, imageView, itemImage } = styles;

  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View style={imageView}>
          <TouchableOpacity
            style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => {
              
            }}
          >
            {/* <Icon name="heart" type="antdesign" size={20} color={color.red} /> */}
            <Icon name="heart" type="antdesign" size={20} color={color.greylight} />
          </TouchableOpacity>
          <Image
            style={itemImage}
            resizeMode="contain"
            source={{
              uri: sp_hinhanh,
            }}
          />
        </View>
        <Text>{sp_ten}</Text>
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
});
