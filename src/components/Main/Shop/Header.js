//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withBadge, Icon } from '@rneui/base';
import color from '../../../../assets/color';

const BadgedIcon = withBadge(1)(Icon);

export default function Header() {
  return (
    <View>
    <Header
      containerStyle={{ height: 50, paddingHorizontal: 20 }}
      leftComponent={{
        icon: 'menu',
        color: color.white,
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
    </View>
  );
}
