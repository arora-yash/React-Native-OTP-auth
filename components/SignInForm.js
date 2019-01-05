import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import * as firebase from 'firebase';

const ROOT_URL = 'https://us-central1-fir-react-test-8d168.cloudfunctions.net/'

class SignInForm extends Component {
  constructor(props) {
        super(props);
        this.state = { phone: '+91', code: '' };
    }

    async handleSubmit() {
          try {
              let response = await axios.post(`${ROOT_URL}verifyOTP`, { phone: this.state.phone, code: this.state.code });
              firebase.auth().signInWithCustomToken(response.data.token);
          } catch (err) {
              console.log(err);
          }
      }

  render() {
    return(
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />

          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>

        <Button onPress={this.handleSubmit.bind(this)} title="Submit" />
      </View>
    );
  }
}

export default SignInForm;
