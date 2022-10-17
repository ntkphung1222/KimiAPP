import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

const numColumns = 3;

export default function Search({ navigation }) {
  const [search, setSearch] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('http://kimimylife.site/api/category')
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
        setMasterDataSource(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        // Applying filter for the inserted text in search bar
        const itemData = item.dm_ten
          ? item.dm_ten.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setServerData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setServerData(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.item}>
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: item.dm_hinhanh }}
      />
      <Text style={styles.itemText}>{item.dm_ten}</Text>
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
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          onFocus={() => {
            setIsHighlighted(true);
          }}
          onBlur={() => setIsHighlighted(false)}
          placeholderTextColor={color.text}
          style={[styles.inputSearch, isHighlighted && styles.isHighlighted]}
          maxLength={10}
          autoCapitalize={false}
          keyboardType="default"
          textContentType="none"
        />
        <TouchableOpacity
          style={styles.touchIconQR}
          onPress={() => {
            // navigation.goBack();
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
    //height: 44,
    width: itemWidth,
    //backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    backgroundColor: color.white
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
  isHighlighted: {
    borderColor: 'green',
    borderWidth: 1,
  },
  wrapper: { backgroundColor: color.white, paddingHorizontal: 20 },
});

