import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../helpers/context';

export function homecomponent({navigation})
{
 
  const {signOut} = React.useContext(AuthContext);          //accessing auth context function signout created at App.js file

  useEffect(()=>{        //this will be automattically called is similar to component did mount
    async function functioname()            //creating async function 'functionname' 
    {
      const userToken = await AsyncStorage.getItem('userToken');           //getting token from local storage
      const Phonenumber = await AsyncStorage.getItem('Phonenumber');        //getting number from local storage
      console.log(userToken + " " + Phonenumber);                          
    }
    functioname();
    }, []);

  const checkcontacts = async()=>{         //this function will be called when userr click on contacts
    navigation.navigate('Contacts');  //navigating to contacts component
  }

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={checkcontacts} ><Text>CONTACTS</Text></TouchableOpacity>
      <TouchableOpacity onPress={signOut}><Text>Logout</Text></TouchableOpacity>
      
    </View>
  );

}