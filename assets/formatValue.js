import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NumericFormat } from 'react-number-format';

export default function formatValue(val, style) {
  return (
    <NumericFormat
      type="text"
      value={val}
      allowLeadingZeros
      thousandSeparator=","
      displayType="text"
      suffix={'đ'}
      renderText={(value) => <Text style={style}>{value}</Text>}
    />
  );
}

const styles = StyleSheet.create({

});
