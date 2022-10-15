import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import partyIcon from '../../../../images/temp/party.jpg';
import maxiIcon from '../../../../images/temp/maxi.jpg';
import littleIcon from '../../../../images/temp/little.jpg';
import color from '../../../../../assets/color';

export default function Banner() {
  const { banner, imageStyle } = styles;
  return (
    <View style={banner}>
      <Swiper autoplay>
        <Image source={littleIcon} style={imageStyle} resizeMode='contain' />
        <Image source={partyIcon} style={imageStyle} />
        <Image source={maxiIcon} style={imageStyle} />
      </Swiper>
    </View>
  );
}
const { width } = Dimensions.get('window');
const imageWidth = width - 40;
//const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  banner: {
    height: width / 2,
    width,
    margin: 0,
    backgroundColor: color.white,
    shadowColor: '#2E272B',
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: width / 2,
    width: imageWidth,
    borderRadius: 20,
  },

});
