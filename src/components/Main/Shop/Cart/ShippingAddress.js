import React, { useState, useEffect } from 'react';
import {
  View,
  //ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert
  //Dimensions,
} from 'react-native';
// import Select from 'react-select';
import { Icon } from 'react-native-elements';
import color from '../../../../../assets/color';

// eslint-disable-next-line import/imports-first
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function ShippingAddress({ navigation }) {
  const {
    container,
    header,
    headerIcon,
    headerTitle,
    wrapper,
    label,
    inputStyle,
  } = styles;
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
        <Text style={headerTitle}>Địa chỉ nhận hàng</Text>
      </View>
      <View style={wrapper}>
        {/* <View>
          <Text style={label}>Thông tin người nhận</Text>
          <TextInput style={inputStyle} placeholder="Tên người nhận" />
          <TextInput
            style={inputStyle}
            placeholder="Số điện thoại người nhận"
          />
        </View> */}
        <View>
          <Text style={label}>Địa chỉ nhận hàng</Text>
          <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            // Change listner on the searchable input
            onItemSelect={(item) => Alert.alert(JSON.stringify(item))}
            // Called after the selection from the dropdown
            containerStyle={{ }}
            // Suggestion container style
            textInputStyle={inputStyle}
            itemStyle={{
              // Single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              // Text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              // Items container style you can pass maxHeight
              // To restrict the items dropdown hieght
              maxHeight: '50%',
            }}
            items={serverData}
            // Mapping of item array
            defaultIndex={2}
            // Default selected item index
            placeholder="Tỉnh/ Thành"
            // Place holder for the search input
            resetValue={false}
            // Reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            // To remove the underline from the android input
          />
          {/* <Select options={options} /> */}
          <TextInput style={inputStyle} placeholder="Quận/ Huyện" />
          <TextInput style={inputStyle} placeholder="Phường/ Xã" />
          <TextInput style={inputStyle} placeholder="Số nhà/ Tên đường" />
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
  header: {
    flexDirection: 'row',
    height: 50,
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
  wrapper: {
    //backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    paddingVertical: 10,
  },
  inputStyle: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: color.borderSecond,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
