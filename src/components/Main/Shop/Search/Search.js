import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

export default function Search({ navigation }) {
  const { container, header, wrapper, headerIcon, inputSearch } = styles;
  return (
    <View style={container}>
      <View style={header}>
        <TouchableOpacity
          style={headerIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="angle-left" type="font-awesome" size={35} color={color.white} />
        </TouchableOpacity>
        <TextInput
        
          placeholder="Tìm kiếm ở đây"
          placeholderTextColor={color.text}
          style={inputSearch}
          maxLength={10}
          autoCapitalize={false}
          keyboardType="default"
          textContentType="none"
        />
      </View>
      <ScrollView style={wrapper}>
        <Text> Conttent</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headerIcon: {
    marginRight: 20,
  },
  inputSearch: {
    flex: 8,
    height: 40,
    backgroundColor: color.white,
    borderRadius: 6,
    
    paddingHorizontal: 10,
    fontSize: 16,
    color: color.text,
  },
  wrapper: { backgroundColor: color.white },
});
