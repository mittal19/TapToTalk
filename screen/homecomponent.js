import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

export function homecomponent()
{

  const {signOut} = React.useContext(AuthContext);

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={signOut}><Text>Logout</Text></TouchableOpacity>
    </View>
  );

}