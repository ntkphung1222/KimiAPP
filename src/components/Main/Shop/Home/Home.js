import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Col, Grid } from 'react-native-easy-grid';
import { Header, Icon, Card, Button, withBadge } from '@rneui/themed';
import color from '../../../../../assets/color';
import partyIcon from '../../../../images/temp/party.jpg';
import maxiIcon from '../../../../images/temp/maxi.jpg';
import littleIcon from '../../../../images/temp/little.jpg';

const { width, height } = Dimensions.get('window');
const BadgedIcon = withBadge(1)(Icon);

export default function Home({ navigation }) {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  const { textSearch, wrapper, imageStyle } = styles;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Header
          containerStyle={{ height: height / 12 }}
          //style={styles.headerContainer}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
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
        <View style={wrapper}>
          <Swiper autoplay>
            <Image source={littleIcon} style={imageStyle} />
            <Image source={partyIcon} style={imageStyle} />
            <Image source={maxiIcon} style={imageStyle} />
          </Swiper>
        </View>
        <Grid>
          <Col>
            <Card>
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                }}
              />
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
              <Button
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
              />
            </Card>
          </Col>
        </Grid>
      </View>
    </ScrollView>
  );
}

const imageWidth = width - 20;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
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
    height: 40
  },
  textSearch: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: color.text,
  },
  wrapper: {
    height: height * 0.28,
    margin: 0,
    backgroundColor: color.white,
    shadowColor: '#2E272B',
    padding: 10,
  },
  imageStyle: {
    height: imageHeight,
    width: imageWidth,
  },
});
