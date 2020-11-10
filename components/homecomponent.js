import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';
//import firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";

export function homecomponent({navigation})
{
 
  const {signOut} = React.useContext(AuthContext);

  useEffect(()=>{
    async function functioname()
    {
      const userToken = await AsyncStorage.getItem('userToken');
      const Phonenumber = await AsyncStorage.getItem('Phonenumber');
      console.log(userToken + " " + Phonenumber);
      const users = await firebase.firestore().collection('users').get();
      console.log(users);
    }
    functioname();
    }, []);

  const checkcontacts = async()=>{
    navigation.navigate('Contacts');
  }

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={checkcontacts} ><Text>CONTACTS</Text></TouchableOpacity>
      <TouchableOpacity onPress={signOut}><Text>Logout</Text></TouchableOpacity>
      
    </View>
  );

}