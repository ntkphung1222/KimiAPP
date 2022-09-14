//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withBadge, Icon } from '@rneui/base';
import color from '../../../../assets/color';

const BadgedIcon = withBadge(1)(Icon);

export default function Header() {
  return (
    <Header
      containerStyle={{ height: 60 }}
      //style={styles.headerContainer}
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        size: 30,
      }}
      rightComponent={
        <View>
          <TouchableOpacity
            // posititon='absolute'
            style={{ marginLeft: -20 }}
          >
            <BadgedIcon name="shopping-cart" color="white" size={30} />
          </TouchableOpacity>
        </View>
      }
      backgroundColor={color.primary}
    />
  );
}
