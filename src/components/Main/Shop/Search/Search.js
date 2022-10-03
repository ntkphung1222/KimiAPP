import React, { useState, useEffect } from 'react';
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

export default function Search({ navigation }) {
  const [serverData, setServerData] = useState([]);
  //const [listItems] = useState(serverData);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('http://kimimylife.site/api/categories')
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.cate_id}</Text>
      <Text style={styles.itemText}>{item.cate_name}</Text>
    </View>
  );
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
        data={serverData}
        //data defined in constructor
        //ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
}

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
