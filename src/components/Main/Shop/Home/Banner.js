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
        <Image source={littleIcon} style={imageStyle} />
        <Image source={partyIcon} style={imageStyle} />
        <Image source={maxiIcon} style={imageStyle} />
      </Swiper>
    </View>
  );
}
const { width, height } = Dimensions.get('window');
const imageWidth = width - 20;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
  banner: {
    height: height * 0.28,
    width,
    margin: 0,
    backgroundColor: color.white,
    shadowColor: '#2E272B',
    padding: 10,
  },
  imageStyle: {
    height: imageHeight,
    width: imageWidth,
  },

});
