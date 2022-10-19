import React, { useEffect, useState } from 'react';
import {
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  Text,
  //StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../../../../assets/color';
import Banner from './Banner';
import Category from './Category';
import NewProduct from './NewProduct';
//import global from '../../../global';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    //StatusBar.setHidden(true);
    // eslint-disable-next-line no-undef
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    AsyncStorage.getItem('user').then((userR) => {
      //console.log(userR);
      if (userR !== null) {
        const userCurrent = JSON.parse(userR);
        setUser(userCurrent);
      }
    });
  }, []);
  //const BadgedIcon = withBadge(1)(Icon);
  const { container } = styles;
  return (
    <View style={container}>
      {/* <Header
        containerStyle={{ height: 50, paddingHorizontal: 20 }}
        leftComponent={<Text>Xin chào, {user.name}</Text>}
        rightComponent={
          <View>
            <TouchableOpacity>
              <BadgedIcon name="notifications" color="white" size={30} />
            </TouchableOpacity>
          </View>
        }
        backgroundColor={color.primary}
      /> */}
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: 22,
          //backgroundColor: color.primary,
        }}
      >
        <Text>Xin chào, {user.name} </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <Category navigation={navigation} />
        <NewProduct navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: color.backgroundColor,
  },
  searchContainer: {
    //backgroundColor: color.primary,
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
