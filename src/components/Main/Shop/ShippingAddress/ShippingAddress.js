import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import Header from '../Header';

export default function ShippingAddress({ navigation }) {
  const [value, setValue] = useState('1');
const diachi = 'Kim Phụng | 0989415460 , 228 đường 3/2, P. Hưng Lợi, Ninh Kiều, Cần Thơ';
  return (
    <View style={styles.container}>
      <Header title={'Địa chỉ giao hàng'} navigation={navigation} />
      <ScrollView style={styles.wrapper}>
        <View>
          <RadioButton.Group
            //onValueChange={(newValue) => setValue(newValue)}
            onValueChange={(newValue) => {
              setValue(newValue);
              //Alert.alert(label);
            }}
            value={value}
          >
            {/* <TouchableOpacity style={styles.itemAddress}>
              <RadioButton
                value="male"
                //style={{ width: 200, height: 100, backgroundColor: '#333' }}
              />

              <View style={{ width: width * 0.7, paddingVertical: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Kim Phụng | </Text>
                  <Text>0989415460</Text>
                </View>
                <View>
                  <Text>228 đường 3/2, P. Hưng Lợi, Ninh Kiều, Cần Thơ</Text>
                </View>
              </View>
            </TouchableOpacity> */}
            <RadioButton.Item
              position="leading"
              label={diachi}
              value='1'
              style={styles.itemAddress}
              uncheckedColor={color.primary}
            />
            <RadioButton.Item
              position="leading"
              label={diachi}
              value='2'
              style={styles.itemAddress}
            />
          </RadioButton.Group>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddShippingAddress')}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon
            name="add-circle"
            type="iconicons"
            size={30}
            color={color.primary}
          />
          <Text>Thêm địa chỉ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  itemAddress: {
    flexDirection: 'row',
    borderColor: color.borderSecond,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    width: width - 40,
  },
});
