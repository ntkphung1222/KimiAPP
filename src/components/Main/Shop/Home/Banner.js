import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import banner1 from '../../../../images/banner1.jpg';
import banner2 from '../../../../images/banner2.jpg';

import color from '../../../../../assets/color';

export default function Banner() {
    const { banner, imageStyle } = styles;
    return (
        <View style={banner}>
            <Swiper autoplay>
                <Image
                    source={banner1}
                    style={imageStyle}
                    resizeMode="contain"
                />
                <Image source={banner2} style={imageStyle} />
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
        backgroundColor: color.backgroundColor,
        shadowColor: '#2E272B',
        paddingHorizontal: 20,
    },
    imageStyle: {
        height: width / 2,
        width: imageWidth,
        borderRadius: 20,
    },
});
