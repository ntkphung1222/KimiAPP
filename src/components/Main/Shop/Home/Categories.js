import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

const numColumns = 4;

const [serverData, setServerData] = useState({});
console.log(serverData);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('http://127.0.0.1:8000/api/category/')
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

const dummyArray = [
  { id: '1', value: 'A', image: 'Image' },
  { id: '2', value: 'B', image: 'Image' },
  { id: '3', value: 'C', image: 'Image' },
  { id: '4', value: 'D', image: 'Image' },
  { id: '5', value: 'E', image: 'Image' },
  { id: '6', value: 'F', image: 'Image' },
  { id: '7', value: 'G', image: 'Image' },
  { id: '8', value: 'H', image: 'Image' },
  { id: '9', value: 'I', image: 'Image' },
  { id: '10', value: 'J', image: 'Image' },
];

const Categories = () => {
  const [listItems] = serverData;
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.item}>
      <Text style={styles.itemText} onPress={() => getItem(item)}>
        {item.dm_ten}
      </Text>
      <Text style={styles.itemText} onPress={() => getItem(item)}>
        {item.dm_hinhanh}
      </Text>

    </View>
  );

  // const ItemSeparatorView = () => (
  //   //Item Separator
  //   <View style={{ height: 0.5, width: '50%', backgroundColor: '#C8C8C8' }} />
  // );

  const getItem = (item) => {
    //Function for click on an item
    Alert.alert(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Tất cả danh mục </Text>
      <FlatList
        data={listItems}
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
const itemWidth = width / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  item: {
    fontSize: 18,
    height: 44,
    width: itemWidth,
    //backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Categories;
