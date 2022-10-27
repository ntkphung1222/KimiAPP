import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
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
            color={color.primary}
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
          style={styles.buttonSearch}
          onPress={() => {
            // navigation.goBack();
          }}
        >
          <Text
            style={{
              fontFamily: 'SFProDisPlayRegular',
              fontSize: 14,
              color: color.white,
            }}
          >
            Tìm kiếm
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
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
    </View>
  );
}

const { width } = Dimensions.get('window');
const itemWidth = width / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
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
    backgroundColor: color.white,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    marginTop: 22,
    alignItems: 'center',
    //justifyContent: 'space-between',
    //backgroundColor: color.primary,
    paddingHorizontal: 20,
  },
  touchIconBack: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: color.primary,
  },
  buttonSearch: {
    //width: 100,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 20,
    height: 35,
    justifyContent: 'center',
    backgroundColor: color.primary,
    borderRadius: 15,
  },
  headerIcon: {
    marginRight: 0,
  },
  inputSearch: {
    width: '68%',
    height: 35,
    backgroundColor: color.white,
    borderRadius: 6,
    //marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: color.text,
    borderColor: color.primary,
    borderWidth: 1
  },
  isHighlighted: {
    borderColor: color.primary,
    borderWidth: 2,
  },
  wrapper: { backgroundColor: color.backgroundColor, flex: 1 },
});
