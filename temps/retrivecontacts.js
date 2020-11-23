
import React from 'react';
import { Component } from 'react';
import { View,  Text, Platform,PermissionsAndroid,} from 'react-native';
import Contacts from 'react-native-contacts';

export default class App extends Component {

  state = {
    contacts: null
  }

  async componentDidMount() {
 
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) 
        {
          console.log("You can read the phone state");
          Contacts.getAll().then(contacts=>{
            console.log(contacts[1].phoneNumbers[0].number);
          })  
        }
        else 
        {
          console.log("permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  render() {
    return (
      <View><Text>dfg</Text></View>
    )
  }
}
