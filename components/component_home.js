//here for now user can logout or see contacts 

import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {AuthContext} from '../helpers/context';

export function component_home({navigation})
{
  const {logOut} = React.useContext(AuthContext);          //accessing auth context function logOut created at App.js file

  const checkcontacts = async()=>     //this function will be called when userr click on contacts
  {         
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