import React, {useState, Component} from 'react';
import {StyleSheet, Picker, View, Text} from 'react-native';

class QuantityPicker extends Component {
  state = {quantity: '0'};
  updatedQuantity = (quantity) => {
    this.setState({quantity: quantity});
  };
  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.quantity}
          onValueChange={this.updatedQuantity}>
          <Picker.Item label="Click for Quantity" value="0" />
          <Picker.Item label="1" value="Quantity" />
          <Picker.Item label="2" value="Quantity" />
          <Picker.Item label="3" value="Quantity" />
          <Picker.Item label="4" value="Quantity" />
        </Picker>
        <Text style={styles.pickView}>{this.state.quantity}</Text>
      </View>
    );
  }
}
export default QuantityPicker;

const styles = StyleSheet.create({
  pickView: {
    fontSize: 16,
    alignSelf: 'auto',
    color: 'red',
  },
});
