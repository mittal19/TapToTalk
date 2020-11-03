import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

export function homecomponent()
{
   
  const {signOut} = React.useContext(AuthContext);
  useEffect(()=>{
    async function functioname()
    {
      const userToken = await AsyncStorage.getItem('userToken');
      const Phonenumber = await AsyncStorage.getItem('Phonenumber');
      console.log(userToken + " " + Phonenumber);
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