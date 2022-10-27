import React, { useState, useEffect } from 'react';
import {
  ScrollView,
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

const numColumns = 4;

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
  return (
    <View style={styles.container}>
      <Text style={font.textTitle1}> Tất cả danh mục </Text>
      {/* <FlatList
        data={serverData}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10 }}>
          {serverData.map((item) => (
            <TouchableOpacity
              key={item.dm_ma}
              style={styles.item}
              onPress={() => navigation.navigate('Products', { cate: item })}
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: color.backgroundColor,
  },
  label: {
    fontSize: 18,
  },
  content: {},
  item: {
    width: 60,
    marginRight: 13,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: color.primary,
  },
  itemImageView: {
    borderRadius: 60,
    width: 60,
    height: 60,
    //paddingHorizontal: 5,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 60,
    //backgroundColor: color.white,
  },
  itemText: {
    fontSize: 12,
    marginHorizontal: 0,
    textAlign: 'center',
  },
  textView: {
    height: 40,
    width: itemWidth - 15,
    //backgroundColor: color.white,
    justifyContent: 'center',
  },
});

export default Category;
