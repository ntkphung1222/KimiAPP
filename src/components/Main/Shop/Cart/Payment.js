import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

export default function Payment({ navigation }) {
  const [value, setValue] = useState('first');
  const { container, header, wrapper, headerIcon, headerTitle, paymentoptions } = styles;

  return (
    <View style={container}>
      <View style={header}>
        <TouchableOpacity
          style={headerIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="angle-left" type="font-awesome" size={30} color={color.white} />
        </TouchableOpacity>
        <Text style={headerTitle}>Thanh toán</Text>
      </View>
      <ScrollView style={wrapper}>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View style={paymentoptions}>
            <RadioButton value="first" />
            <Text>First</Text>
          </View>
          <View style={paymentoptions}>
            <RadioButton value="second" />
            <Text>Second</Text>
          </View>
          <View style={paymentoptions}>
            <RadioButton value="third" />
            <Text>Third</Text>
          </View>
        </RadioButton.Group>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const { optionWidth } = width - 80;

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
    paddingVertical: 10,
  },
  headerIcon: {
    marginRight: 120,
  },
  headerTitle: {
    fontSize: 20,
    color: color.white,
  },
  wrapper: { backgroundColor: color.white },
  paymentoptions: {
    width: optionWidth,
    height: 100,
    borderColor: '#333',
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
});
