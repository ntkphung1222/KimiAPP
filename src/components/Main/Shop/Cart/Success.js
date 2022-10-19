import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function Success({ navigation }) {
  const { container, wrapper, checkIconView } = styles;
  return (
    <View style={container}>
      <View style={wrapper}>
        <View style={checkIconView}>
          <Icon type="octicons" name="check" size={80} color={color.primary} />
        </View>
        <View>
            <Text style={font.textTitle1} >Đặt hàng thành công</Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                <Text>Quay lại trang chủ</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    width: width - 40,
    borderRadius: 50,
    backgroundColor: color.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconView: {
    borderWidth: 7,
    width: width / 3,
    height: width / 3,
    borderColor: color.primary,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
});
