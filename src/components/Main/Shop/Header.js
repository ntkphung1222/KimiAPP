//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import color from '../../../../assets/color';


export default function Header({ navigation, title }) {
  //const title = route.params.title;
  const { header, headerIcon, headerTitle } = styles;
  
  return (
    <View style={header}>
    <TouchableOpacity
      style={headerIcon}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon
        name="angle-left"
        type="font-awesome"
        size={30}
        color={color.white}
      />
    </TouchableOpacity>
    <Text style={headerTitle}>{title}</Text>
    
  </View>
  );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    width,
    alignItems: 'flex-start',
    backgroundColor: color.primary,
  },
  headerIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
