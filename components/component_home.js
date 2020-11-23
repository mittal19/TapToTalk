import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../helpers/context';

export function component_home({navigation})
{
 
  const {logOut} = React.useContext(AuthContext);          //accessing auth context function signout created at App.js file

  const checkcontacts = async()=>{         //this function will be called when userr click on contacts
    navigation.navigate('Contacts');  //navigating to contacts component
  }

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={checkcontacts} ><Text>CONTACTS</Text></TouchableOpacity>
      <TouchableOpacity onPress={logOut}><Text>Logout</Text></TouchableOpacity>
      
    </View>
  );

}