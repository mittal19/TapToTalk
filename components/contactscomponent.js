import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';
//import firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";

export function contactscomponent()
{
  return(
    <View>
      <Text>CONTACTS</Text>     
    </View>
  );
}