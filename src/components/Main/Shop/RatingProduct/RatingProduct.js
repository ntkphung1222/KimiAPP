import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import color from '../../../../../assets/color';
import Header from '../Header';
//import font from '../../../../../assets/font';

export default function RatingProduct({ navigation, route }) {
  const { product } = route.params;
  const { container, wrapper, input } = styles;
  return (
    <View style={container}>
      <Header title="Đánh giá sản phẩm" navigation={navigation} />
      <View style={wrapper}>
        <View style={styles.itemView}>
          <View style={styles.leftItemView}>
            <Image
              style={styles.itemImage}
              resizeMode="contain"
              source={{
                uri: product.sp_hinhanh,
              }}
            />
          </View>
          <View style={styles.rightItemView}>
            <Text>{product.sp_ten}</Text>
            <Text>{product.sp_ten}</Text>
            <Text>{product.sp_ten}</Text>
          </View>
        </View>
        <View>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very Good']}
            defaultRating={5}
           
          />
        </View>
        <View>
          <TextInput
            placeholder="Nhập đánh giá của bạn"
            style={input}
            keyboardType="default"
            multiline
            numberOfLines={10}
          />
          <TouchableOpacity style={styles.ratingButton}>
            <Text style={styles.textRatingButton}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width,
    paddingHorizontal: 20,
  },
  itemView: {
    flexDirection: 'row',
    width: width - 40,
   backgroundColor: color.white,
  },
  leftItemView: {
    width: width * 0.25,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  rightItemView: {
    //backgroundColor: color.white,
    //width: width * 0.75
  },
  input: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.line,
    height: 200,
    width: width - 40,
    justifyContent: 'flex-start',
    padding: 10,
    fontSize: 16,
    fontFamily: 'SFProDisPlayRegular',
    textAlignVertical: 'top',
    backgroundColor: color.white,
  },
  ratingButton: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    width: width - 40,
  },
  textRatingButton: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
