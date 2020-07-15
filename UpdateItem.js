import React from 'react';
import {
  View,
  ScrollView,
  Alert,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

export default class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_product_id: '',
      product_name: '',
      product_price: '',
      product_quantity: '',
    };
  }

  searchItem = () => {
    const {input_product_id} = this.state;
    console.log(this.state.input_product_id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_user where product_id = ?',
        [input_product_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            console.log(results.rows.item(0).product_name);
            this.setState({
              product_name: results.rows.item(0).product_name,
            });
            this.setState({
              product_price: results.rows.item(0).product_price,
            });
            this.setState({
              product_quantity: results.rows.item(0).product_quantity,
            });
          } else {
            alert('No Item found');
            this.setState({
              product_name: '',
              product_price: '',
              product_quantity: '',
            });
          }
        },
      );
    });
  };

  searchProduct = () => {
    const {input_product_name} = this.state;
    console.log(this.state.input_product_name);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tbl_user where product_name = ?',
        [input_product_name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            console.log(results.rows.item(0).product_name);
            this.setState({
              product_id: results.rows.item(0).product_id,
            });
            this.setState({
              product_price: results.rows.item(0).product_price,
            });
            this.setState({
              product_quantity: results.rows.item(0).product_quantity,
            });
          } else {
            alert('No product found');
            this.setState({
              product_name: '',
              product_price: '',
              product_quantity: '',
            });
          }
        },
      );
    });
  };

  updateItem = () => {
    var that = this;
    const {input_product_id} = this.state;
    const {product_name} = this.state;
    const {product_price} = this.state;
    const {product_quantity} = this.state;
    if (product_name) {
      if (product_price) {
        if (product_quantity) {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE tbl_user set product_name=?, product_price=? , product_quantity=? where product_id=?',
              [product_name, product_price, product_quantity, input_product_id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'product updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Updation Failed');
                }
              },
            );
          });
        } else {
          alert('Please fill Quantity');
        }
      } else {
        alert('Please fill Price');
      }
    } else {
      alert('Please fill Item');
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <TextInput
              placeholder="Enter Product Id"
              style={{padding: 10}}
              onChangeText={(input_product_id) =>
                this.setState({input_product_id})
              }
            />
            <Button
              title="Search Product by ID"
              onPress={this.searchItem.bind(this)}
            />
            <TextInput
              placeholder="Enter Product Name"
              style={{padding: 10}}
              onChangeText={(input_product_name) =>
                this.setState({input_product_name})
              }
            />
            <Button
              title="Search Product by Name"
              onPress={this.searchProduct.bind(this)}
            />
            <TextInput
              placeholder="Enter Product Name"
              value={this.state.product_name}
              style={{padding: 10}}
              onChangeText={(product_name) => this.setState({product_name})}
            />
            <TextInput
              placeholder="Enter Product Price"
              value={'' + this.state.product_price}
              onChangeText={(product_price) => this.setState({product_price})}
              maxLength={10}
              style={{padding: 10}}
              keyboardType="numeric"
            />
            <TextInput
              value={this.state.product_quantity}
              placeholder="Enter Quantity"
              onChangeText={(product_quantity) =>
                this.setState({product_quantity})
              }
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Button
              title="Update Product"
              onPress={this.updateItem.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
