import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

const numColumns = 3;

const dummyArray = [
  { id: '1', value: 'A', image: 'A1' },
  { id: '2', value: 'B', image: 'A1' },
  { id: '3', value: 'C', image: 'A1' },
  { id: '4', value: 'D', image: 'A1' },
  { id: '5', value: 'E', image: 'A1' },
  { id: '6', value: 'F', image: 'A1' },
  { id: '7', value: 'G', image: 'A1' },
  { id: '8', value: 'H', image: 'A1' },
  { id: '9', value: 'I', image: 'A1' },
  { id: '10', value: 'J', image: 'A1' },
];

const Search = ({ navigation }) => {
  const [listItems] = useState(dummyArray);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.item}>
      <Text style={styles.itemText} onPress={() => getItem(item)}>
        {item.image}
      </Text>
      <Text style={styles.itemText} onPress={() => getItem(item)}>
        {item.value}
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.touchIconBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            style={styles.headerIcon}
            name="angle-left"
            type="font-awesome"
            size={35}
            color={color.white}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Tìm kiếm ở đây"
          placeholderTextColor={color.text}
          style={styles.inputSearch}
          maxLength={10}
          autoCapitalize={false}
          keyboardType="default"
          textContentType="none"
        />
        <TouchableOpacity
          style={styles.touchIconQR}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            style={styles.headerIcon}
            name="qr-code-scanner"
            size={30}
            color={color.white}
          />
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: color.primary,
  },
  touchIconBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  touchIconQR: {
    width: 50,
    height: 50,

    justifyContent: 'center',
    //alignContent: 'flex-end'
  },
  headerIcon: {
    //marginRight: 20,
  },
  inputSearch: {
    width: '70%',
    height: 35,
    backgroundColor: color.white,
    borderRadius: 6,
    //marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 7.5,
    fontSize: 16,
    color: color.text,
  },
  wrapper: { backgroundColor: color.white, paddingHorizontal: 20 },
});

export default Search;
