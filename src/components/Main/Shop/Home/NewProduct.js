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
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import getNewProduct from '../../../../api/getNewProduct';

export default function NewProduct({ navigation }) {
  const [serverData, setServerData] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    getNewProduct()
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.itemImageView}>
        {/* <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 10 }}
        >
          <Icon name="heart" type="antdesign" size={15} color={color.red} />
        </TouchableOpacity> */}
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{ uri: item.sp_hinhanh }}
        />
      </View>

      <View style={styles.itemFooter}>
        <Text style={font.textName}>{item.sp_ten}</Text>
        <Text style={font.textPrice}>{item.sp_ten}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={font.textTitle1}> Sản phẩm mới nhất </Text>
      <FlatList
        data={serverData}
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
    //backgroundColor: color.white
  },
  label: {
    fontSize: 18,
  },
  item: {
    width: itemWidth,
    padding: 7,
    elevation: 1,
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 6,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  itemImageView: {
    width: itemWidth,
    paddingHorizontal: 7
  },
  itemImage: {
    width: itemWidth - 14,
    height: itemWidth,
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
