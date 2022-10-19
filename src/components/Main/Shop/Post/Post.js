// import React, { useState } from 'react';
// import {
//   FlatList,
//   View,
//   Text,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import color from '../../../../../assets/color';

// const dummyArray = [
//   { id: '1', value: 'A', image: 'A1' },
//   { id: '2', value: 'B', image: 'A1' },
//   { id: '3', value: 'C', image: 'A1' },
//   { id: '4', value: 'D', image: 'A1' },
//   { id: '5', value: 'E', image: 'A1' },
//   { id: '6', value: 'F', image: 'A1' },
//   { id: '7', value: 'G', image: 'A1' },
//   { id: '8', value: 'H', image: 'A1' },
//   { id: '9', value: 'I', image: 'A1' },
//   { id: '10', value: 'J', image: 'A1' },
// ];

// const Post = () => {
//   const [listItems] = useState(dummyArray);
//   const ItemView = ({ item }) => (
//     // Single Comes here which will be repeatative for the FlatListItems
//     <View style={styles.item}>
//       <Text style={styles.itemText} onPress={() => getItem(item)}>
//         {item.image}
//       </Text>
//       <Text style={styles.itemText} onPress={() => getItem(item)}>
//         {item.value}
//       </Text>
//     </View>
//   );

//   // const ItemSeparatorView = () => (
//   //   //Item Separator
//   //   <View style={{ height: 0.5, width: '50%', backgroundColor: '#C8C8C8' }} />
//   // );

//   const getItem = (item) => {
//     //Function for click on an item
//     Alert.alert(item.id);
//   };
//   const { container, header, headerTitle } = styles;
//   return (
//     <View style={container}>
//       <View style={header}>
//         <Text style={headerTitle}>Bài viết</Text>
//       </View>
//       <FlatList
//         data={listItems}
//         //data defined in constructor
//         //ItemSeparatorComponent={ItemSeparatorView}
//         showsVerticalScrollIndicator={false}
//         renderItem={ItemView}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// // const { width } = Dimensions.get('window');
// // const itemWidth = width - 40;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 50,
//     alignItems: 'flex-start',
//     backgroundColor: color.primary,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: color.white,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   item: {
//     fontSize: 18,
//     height: 100,
//     marginVertical: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Post;

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@rneui/themed';
import color from '../../../../../assets/color';

export default function MyComponent() {
  const { container, header, headerTitle } = styles;

  return (
    <View style={container}>
      <View style={header}>
        <Text style={headerTitle}>Bài viết</Text>
      </View>
      <Card>
        <Card.Image
          style={{ margin: 0 }}
          source={{
            uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  header: {
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
});
