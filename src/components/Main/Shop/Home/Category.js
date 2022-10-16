import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import getCategory from '../../../../api/getCategory';

const numColumns = 3;

const Category = ({ navigation }) => {
  const [serverData, setServerData] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    getCategory()
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const ItemView = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(
          'Products',
          { cate: item }
        )
      }
    >
      <View style={styles.itemImageView}>
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.dm_hinhanh }}
      />
      </View>
      <View style={styles.textView}>
      <Text style={styles.itemText}>{item.dm_ten}</Text>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={font.textTitle1}> Tất cả danh mục </Text>
      <FlatList
        data={serverData}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    //backgroundColor: color.white
  },
  label: {
    fontSize: 18,
  },
  content: {},
  item: {
    width: itemWidth - 5,
    marginRight: 6.7,
    marginBottom: 6.7,
    //elevation: 1,
    padding: 5,
    //backgroundColor: '#333',
    //borderWidth: 2,
    //borderColor: '#333',
    //borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImageView: {
    borderRadius: 50,
    height: itemWidth - 40,
    width: itemWidth - 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
  },
  itemImage: {
    width: 40,
    height: 40,
    backgroundColor: color.white
  },
  itemText: {
    fontSize: 8,
    marginHorizontal: 0,
    textAlign: 'center'
  },
  textView: {
    height: 20,
    width: itemWidth - 15,
    //backgroundColor: color.white,
    justifyContent: 'center'
  }
});

export default Category;
