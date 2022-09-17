import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import color from '../../../../../assets/color';
import sp1 from '../../../../images/temp/sp1.jpeg';

export default function Products() {
  const { container, titleContainer, title, body,
     productContainer, productImage,
    productName, productPrice } = styles;
  return (
    <ScrollView style={container}>
        <View style={titleContainer}>
            <Text style={title}> Filters </Text>
        </View>
        <View style={body}>
            <View style={productContainer}>
                <Image source={sp1} style={productImage} />
                <Text style={productName}>Tên</Text>
                <Text style={productPrice}>Gía</Text>
            </View>
            <View style={productContainer}>
                <Image source={sp1} style={productImage} />
                <Text style={productName}>Tên</Text>
                <Text style={productPrice}>Gía</Text>
            </View>
            <View style={productContainer}>
                <Image source={sp1} style={productImage} />
                <Text style={productName}>Tên</Text>
                <Text style={productPrice}>Gía</Text>
            </View>
            <View style={productContainer}>
                <Image source={sp1} style={productImage} />
                <Text style={productName}>Tên</Text>
                <Text style={productPrice}>Gía</Text>
            </View>
        </View>
    </ScrollView>
  );
}
const { width } = Dimensions.get('window');
const productWidth = (width - 50) / 2;
const productImageHeight = (productWidth / 361) * 452;

const styles = StyleSheet.create({
container: {
    backgroundColor: color.white,
    margin: 10 
},
titleContainer: {
    height: 50,
    padding: 10
},
title: {

},
body: {
flexDirection: 'row',
justifyContent: 'space-around',
flexWrap: 'wrap'
},
productContainer: {
width: productWidth,
shadowColor: color.text,
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.2,
borderRadius: 10,
},
productImage: {
width: productWidth,
height: productImageHeight
},
productName: {

},
productPrice: {

}
});

