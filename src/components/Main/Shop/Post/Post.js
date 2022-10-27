import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import font from '../../../../../assets/font';
import color from '../../../../../assets/color';

const data = [
  {
    id: 1,
    bv_hinhanh:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    bv_ten: 'BV 1',
    bv_dm: 'Sống khỏe',
  },
  {
    id: 2,
    bv_hinhanh:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    bv_ten: 'BV 2',
    bv_dm: 'Đại dịch covid',
  },
  {
    id: 3,
    bv_hinhanh:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    bv_ten: 'BV 3',
    bv_dm: 'Mắt',
  },
  {
    id: 4,
    bv_hinhanh:
      'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
    bv_ten: 'BV 4',
    bv_dm: 'Vệ sinh',
  },
];
const bgColor = [color.primary, '#615DD9', '#019E8B', '#FD6C57'];

export default function Post() {
  // const [dataPost, setDataPost] = useState([]);
  const [dataPost] = useState(data);
  const { container, header, headerTitle } = styles;

  return (
    <View style={container}>
      <View style={header}>
        <Text style={headerTitle}>Bài viết</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 20 }}
        >
          {dataPost.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={{
                borderRadius: 8,
                marginRight: 5,
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 3,
                backgroundColor: bgColor[i],
              }}
            >
              <Text
                style={font.label16white}
              >
                {item.bv_dm}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={font.label16blackbold}>Bài viết nổi bật</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 20 }}
        >
          {dataPost.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemTop}>
              <Image
                style={styles.itemImageTop}
                resizeMode="cover"
                source={{
                  uri: item.bv_hinhanh,
                }}
              />
              <Text style={styles.itemNameTop}>{item.bv_ten}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={font.label16blackbold}>Bài viết gần đây</Text>
        <View style={{ marginHorizontal: 20 }}>
          {dataPost.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemRecent}>
              <Image
                style={styles.itemImageRecent}
                resizeMode="cover"
                source={{
                  uri: item.bv_hinhanh,
                }}
              />
              <Text style={styles.itemNameRecent}>{item.bv_ten}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
//const bgColor = ['red', 'blue'];

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  header: {
    marginTop: 22,
    height: 50,
    alignItems: 'flex-start',
    backgroundColor: color.primary,
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  wrapper: {
    backgroundColor: color.backgroundColor,
  },
  dmView: {
    backgroundColor: bgColor[Math.floor(Math.random() * bgColor.length)],
    borderRadius: 8,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemTop: {
    marginRight: 10,
    borderRadius: 10,
  },
  itemImageTop: {
    width: (width * 2) / 3,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemNameTop: {},
  itemRecent: {
    marginBottom: 10,
    borderRadius: 10,
  },
  itemImageRecent: {
    width: width - 40,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemNameRecent: {},
});
