import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';
//import firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";

export function homecomponent()
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

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={signOut}><Text>Logout</Text></TouchableOpacity>
      
    </View>
  );

}