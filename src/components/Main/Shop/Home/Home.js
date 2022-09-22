import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Header, Icon, withBadge } from '@rneui/themed';
import color from '../../../../../assets/color';
import Banner from './Banner';
import Categories from './Categories';
import NewProducts from './NewProducts';


const BadgedIcon = withBadge(1)(Icon);

export default function Home({ navigation }) {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  const { container, textSearch } = styles;
  return (
    <View style={container}>
      <Header
        containerStyle={{ height: 50, paddingHorizontal: 20 }}
        leftComponent={{
          icon: 'menu',
          color: color.white,
          size: 30,
        }}
        rightComponent={
          <View>
            <TouchableOpacity>
              <BadgedIcon name="notifications" color="white" size={30} />
            </TouchableOpacity>
          </View>
        }
        backgroundColor={color.primary}
      />
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate('Search')}
        >
          <Icon name="search" size={30} color={color.text} />
          <Text style={textSearch}>Tìm kiếm ở đây...</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Banner />
        <Categories />
        <NewProducts />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 50,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: color.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 6,
  },
  textSearch: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: color.text,
  },
});
