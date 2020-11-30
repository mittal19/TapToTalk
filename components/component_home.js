//here for now user can logout or see contacts 

import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {AuthContext} from '../helpers/context';
import AsyncStorage from '@react-native-community/async-storage';

export function component_home({navigation})
{
  const {logOut} = React.useContext(AuthContext);          //accessing auth context function logOut created at App.js file

  const [userNumber,set_userNumber] = useState('');
  
  const checkcontacts = async()=>     //this function will be called when userr click on contacts
  {         
    navigation.navigate('Contacts',{userNumber});  //navigating to contacts component
  }

  useEffect(()=>  //this will be automattically called is similar to component did mount
  {            
    async function functionname()
    {
      set_userNumber(await AsyncStorage.getItem('userNumber'));
    }
    functionname();
  },[]);

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={checkcontacts} ><Text>CONTACTS</Text></TouchableOpacity>
      <TouchableOpacity onPress={logOut}><Text>Logout</Text></TouchableOpacity>
    </View>
  );

}