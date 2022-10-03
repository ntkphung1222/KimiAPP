import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const numColumns = 4;
const dummyArray = [
  {
    id: '1',
    value: 'A',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '2',
    value: 'B',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '3',
    value: 'C',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '4',
    value: 'D',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '5',
    value: 'E',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '6',
    value: 'F',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '7',
    value: 'G',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
  {
    id: '8',
    value: 'H',
    image:
      'https://cdn.pixabay.com/photo/2020/12/09/16/40/pill-5817906_960_720.png',
  },
];

const Categories = ({ navigation }) => {
  // const [serverData, setServerData] = useState({});
  // // console.log(serverData);

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   fetch('http://192.168.43.83:8000/api/category/')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Successful response from the API Call
  //       setServerData(responseJson.results);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const [listItems] = useState(dummyArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(
          'Products',
          { cate: item.id },
          { name: item.name }
        )
      }
    >
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.image }}
      />
      <Text style={styles.itemText}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Tất cả danh mục </Text>
      <FlatList
        data={listItems}
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
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    marginHorizontal: 0,
  },
  itemImage: {
    borderRadius: 6,
    width: itemWidth - 10,
    height: itemWidth - 10,
  },
});

export default Categories;
