import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-fir-react-test-8d168.cloudfunctions.net/'

export default class SignUpForm extends Component {
  constructor(props) {
        super(props);
        this.state = { phone_number: '', errorMessage: null };
    }

    async handleSubmit() {
          try {
          axios.post(`${ROOT_URL}createUser`, { phone_number: this.state.phone })
          .then(() => {
            axios.post(`${ROOT_URL}OTPRequest`, { phone_number: this.state.phone })
          })
          .catch((err) => {
            console.log(`Error received in try catch ${err}`);
          });
          } catch (err) {
              console.log('Error received in try catch ${err}');
          }
      }

  render() {
    return(
      <View>
        <View style={styles.container}>
          <FormLabel>Enter Phone Number</FormLabel>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <FormInput
            value={this.state.phone}
            keyboardType="numeric"
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button onPress={this.handleSubmit.bind(this)} title="Submit" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
