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
import { Icon } from 'react-native-elements';
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
        <Text style={font.textName}>{item.sp_ten}</Text>
        <Text style={font.textPrice}>{item.sp_ten}</Text>
        <View style={styles.likeView}>
          <Icon
            type="antdesign"
            name="like1"
            color={color.blue}
            size={15}
            marginRight={2}
          />
          <Text>12</Text>
        </View>
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
          maxToRenderPerBatch={4}
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
const itemWidth = (width - 40 - 5) / 2;
const itemFilter = (width - 40 - 15) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    paddingHorizontal: 20,
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
  itemImageView: {},
  item: {
    width: itemWidth,
    padding: 5,
    elevation: 1,
    borderRadius: 6,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  itemImage: {
    backgroundColor: color.white,
    width: itemWidth - 10,
    height: itemWidth,
  },
  itemFooter: {
    paddingHorizontal: 5,
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
  likeView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 1,
  },
});
