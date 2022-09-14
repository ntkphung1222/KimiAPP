import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function OrderHistory({ navigation }) {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main', { name: 'Jane' })}
      >
        <Text>go to main</Text>
      </TouchableOpacity>
    </View>
  );
}
