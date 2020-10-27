import React, { Component } from 'react';  
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';  
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component  
{  
  storeData = async (value) => {   
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      console.log("in1");
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  getData = async () => {
    try { 
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        console.log(value);

        // value previously stored
      }
    } catch(e) {
      console.log(e);
      // error reading value
    }
  }
   
    componentDidMount()
    {
       this.storeData("rpoff");
       this.getData();
    }
    
    render()  
    {  
      return(
      <View>
        <Text>df</Text>
      </View> 
      ); 
    }  
}  