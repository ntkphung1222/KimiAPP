import React, { useState, useEffect } from 'react';
import {
  View,
  //ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  //Dimensions,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Input } from '@rneui/themed';
import Header from '../Header';
import color from '../../../../../assets/color';
import { useTogglePasswordVisibility } from '../../../Authentication/useTogglePasswordVisibility';

export default function ChangePassword({ navigation }) {
  const title = 'Đổi mật khẩu';
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { container, wrapper, label, changePassButton, changePassText } =
    styles;
  const { passwordVisibility, show, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch('https://aboutreact.herokuapp.com/demosearchables.php')
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={container}>
      <Header navigation={navigation} title={title} />
      <View style={wrapper}>
        <View>
          <Text style={label}>Thông tin người nhận</Text>
          <Input
            //       containerStyle={{
            //       width: '100%',
            //       height: 50,
            //       backgroundColor: '#C0C0C0',
            //       borderRadius: 6,
            //       marginTop: 10,
            //       paddingHorizontal: 10,
            //       fontSize: 16,
            //       color: color.text,
            // }}
            placeholder="Mật khẩu cũ"
            rightIcon={<Text onPress={handlePasswordVisibility}>{show}</Text>}
            secureTextEntry={passwordVisibility}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Mật khẩu mới"
            rightIcon={<Text onPress={handlePasswordVisibility}>{show}</Text>}
            secureTextEntry={passwordVisibility}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            label="Mật khẩu cũ"
            name="aaa"
            secureTextEntry={passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <TextInput
            label="Mật khẩu mới"
            name="aabbbbP"
            secureTextEntry={passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <TouchableOpacity
            style={changePassButton}
            onPress={() => Alert.alert('Đổi mật khẩu thành công.')}
          >
            <Text style={changePassText}>{title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  wrapper: {
    //backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingVertical: 10,
  },
  //   inputStyle: {
  //     height: 50,
  //     borderWidth: 1,
  //     borderRadius: 6,
  //     borderColor: color.borderSecond,
  //     marginBottom: 5,
  //     paddingHorizontal: 10,
  //   },
  changePassButton: {
    backgroundColor: color.primary,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  changePassText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});
