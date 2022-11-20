import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';
import font from '../../../../../assets/font';

export default function Success({ navigation }) {
  // const { dataCart } = route.params;
  // const productList = JSON.stringify(dataCart);
  const { container, wrapper, checkIconView } = styles;
  return (
    <View style={container}>
      <View style={wrapper}>
        <View style={styles.noticeView}>
          <View style={checkIconView}>
            <Icon
              type="octicons"
              name="check"
              size={80}
              color={color.primary}
            />
          </View>
          <Text style={font.textTitle1}>Đặt hàng thành công</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetail', { productList })}
            style={{ position: 'absolute', bottom: 20 }}
          >
            <Text
              style={{
                fontFamily: 'SFProDisPlayRegular',
                fontSize: 16,
                color: color.darkblue,
                textDecorationLine: 'underline',
              }}
            >
              Chi tiết đơn hàng
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.actionView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.textButton}>Quay lại trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: color.backgroundColor,
  },
  wrapper: {
    width: width - 40,
    justifyContent: 'space-between',
    //backgroundColor: color.white,
    flex: 1,
  },
  noticeView: {
    width: width - 40,
    height: height * 0.8,
    borderRadius: 50,
    backgroundColor: color.white,
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
    marginBottom: 30,
  },
  actionView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    elevation: 8,
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingVertical: 10,
    width: width - 40,
    marginHorizontal: 20,
  },
  textButton: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
