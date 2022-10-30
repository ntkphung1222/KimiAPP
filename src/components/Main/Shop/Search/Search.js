import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

export default function Search({ navigation }) {
  const [search, setSearch] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('http://kimimylife.site/api/allproduct')
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

  const onClickAddCart = (data) => {
    const itemcart = {
      product: data,
      quantity: 1,
      // price: data.sp_giaban,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart != null) {
          const cart = JSON.parse(datacart);        
          const item = cart.find((c) => c.product.sp_ma === data.sp_ma);
          //console.log(item);
          if (item) {
            item.quantity += 1;
          } else {
            cart.push(itemcart);
          }
          AsyncStorage.setItem('cart', JSON.stringify(cart)).then();
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart)).then();
        }
        //Alert.alert('Add thành công');
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        // Applying filter for the inserted text in search bar
        const itemData = item.sp_ten
          ? item.sp_ten.toUpperCase()
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
          placeholder="Nhập tên sản phẩm..."
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          onFocus={() => {
            setIsHighlighted(true);
          }}
          onBlur={() => setIsHighlighted(false)}
          placeholderTextColor={color.text}
          style={[styles.inputSearch, isHighlighted && styles.isHighlighted]}
          autoCapitalize={false}
          keyboardType="default"
          textContentType="none"
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}> Lịch sử tìm kiếm </Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => searchFilterFunction('Kem')}
            style={{
              backgroundColor: color.greylight,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginRight: 5,
            }}
          >
            <Text>Kem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => searchFilterFunction('Thuốc')}
            style={{
              backgroundColor: color.greylight,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginRight: 5,
            }}
          >
            <Text>Thuốc</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}> Tất cả sản phẩm </Text>
        <ScrollView>
          {serverData.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
              style={styles.item}
              key={item.sp_ma}
            >
              <View style={styles.leftItemView}>
                <Image
                  style={styles.itemImage}
                  resizeMode="contain"
                  source={{ uri: item.sp_hinhanh }}
                />
              </View>
              <View style={styles.rightItemView}>
                <View style={styles.rightTopView}>
                  <Text style={styles.itemText}>{item.sp_ten}</Text>
                </View>
                <View style={styles.rightBottomView}>
                  <Text>{item.sp_giaban}</Text>
                  <TouchableOpacity
                    onPress={() => onClickAddCart(item)}
                    style={styles.btnAdd}
                  >
                    <Text style={{ color: color.primary }}>THÊM VÀO GIỎ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: color.backgroundColor,
    backgroundColor: color.white,
  },
  label: {
    fontSize: 18,
  },
  item: {
    flex: 1,
    height: width * 0.3,
    flexDirection: 'row',
    width,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.greylight,
  },
  leftItemView: {
    width: width * 0.3,
    justifyContent: 'center',
  },
  itemImage: {
    flex: 1,
    width: width * 0.25,
  },
  rightItemView: {
    width: width * 0.7,
    padding: 10,
    //backgroundColor: '#333',
  },
  rightTopView: {},
  rightBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    left: 10,
  },
  btnAdd: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    flexDirection: 'row',
    height: 50,
    marginTop: 22,
    alignItems: 'center',
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
    width: '90%',
    height: 35,
    backgroundColor: color.white,
    borderRadius: 6,
    //marginHorizontal: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: color.text,
    borderColor: color.primary,
    borderWidth: 1,
  },
  isHighlighted: {
    borderColor: color.primary,
    borderWidth: 2,
  },
  wrapper: { backgroundColor: color.white, flex: 1 },
  itemText: {},
});
