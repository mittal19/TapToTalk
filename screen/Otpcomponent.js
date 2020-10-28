import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import {AuthContext} from '../context';

export function Otpcomponent()
{

  return(
    <View>
      <Text>HOME</Text>
      <TouchableOpacity onPress={signOut}><Text>Logout</Text></TouchableOpacity>
    </View>
  );

}