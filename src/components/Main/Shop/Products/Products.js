/* eslint-disable camelcase */
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
import { NumericFormat } from 'react-number-format';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';
import Header from '../Header';

const numColumns = 2;
//const title = 'Sản phẩm';

export default function Products({ navigation, route }) {
  const { dm_ma, dm_ten } = route.params.cate;
  const { container, wrapper } = styles;
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`http://kimimylife.site/api/product?category=${dm_ma}`)
      .then((response) => response.json())
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
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.itemImageView}>
        <Image
          style={styles.itemImage}
          resizeMode="contain"
          source={{ uri: item.sp_hinhanh }}
        />
      </View>
      <View style={styles.itemFooter}>
        <Text style={font.productNameSmall}>{item.sp_ten}</Text>
        <NumericFormat
          type="text"
          value={item.sp_giaban}
          allowLeadingZeros
          thousandSeparator=","
          displayType="text"
          suffix={'đ'}
          renderText={(formatValue) => (
            <Text style={font.textPrice}>{formatValue}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={container}>
      <Header navigation={navigation} title={dm_ten} />
      <View style={wrapper}>
        <View style={styles.filterView}>
          <TouchableOpacity style={styles.filter}>
            <Text style={font.label}>Mới nhất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text style={font.label}>Bán chạy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text style={font.label}>Giá cao</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text style={font.label}>Giá thấp</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={serverData}
          //style={wrapper}
          //data defined in constructor
          //ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          //maxToRenderPerBatch={4}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          //ListHeaderComponent={getHeader}
        />
      </View>
    </View>
  );
}
const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2;
const itemFilter = (width - 40 - 15) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  filterView: {
    flexDirection: 'row',
  },
  filter: {
    backgroundColor: color.borderSecond,
    width: itemFilter,
    marginRight: 5,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },

  item: {
    width: itemWidth - 5,
    padding: 0,
    elevation: 1,
    borderWidth: 1,
    borderColor: color.greylight,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: color.white,
  },
  itemImageView: {
    flex: 1,
    height: 110,
    width: itemWidth - 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemImage: {
    borderRadius: 6,
    flex: 1,
  },
  itemFooter: {
    paddingHorizontal: 10,
    width: itemWidth,
  },
  itemName: {
    paddingVertical: 5,
    height: 50,
  },
  itemText: {
    height: 30,
    paddingVertical: 5,
  },
});
