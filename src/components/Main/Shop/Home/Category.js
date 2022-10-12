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
//import color from '../../../../../assets/color';
import getCategory from '../../../../api/getCategory';

const numColumns = 4;

const Category = ({ navigation }) => {
  const [serverData, setServerData] = useState([]);
  // // console.log(serverData);

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
  //const [listItems] = useState(dummyArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(
          'Products',
          { cate: item.dm_ma, titleCate: item.dm_ten }
        )
      }
    >
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.dm_hinhanh }}
      />
      <View style={styles.textView}>
      <Text style={styles.itemText}>{item.dm_ten}</Text>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Tất cả danh mục </Text>
      <FlatList
        data={serverData}
        style={styles.content}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
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
  },
  label: {
    fontSize: 18,
  },
  content: {},
  item: {
    width: itemWidth - 5,
    marginRight: 6.7,
    marginBottom: 6.7,
    elevation: 1,
    padding: 5,
    //backgroundColor: '#333',
    //borderWidth: 2,
    //borderColor: '#333',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: itemWidth - 20,
    height: itemWidth - 20,
    marginBottom: 5,
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
