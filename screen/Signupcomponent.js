import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

export function Signupcomponent()
{
  
  const [phone,setPhone] = React.useState('');
  const [password,setPassword] = React.useState('');
  const {signIn} = React.useContext(AuthContext);

  return(
    <View>
      <TextInput
        placeholder="Phone number"
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
      />
     <TouchableOpacity onPress={signIn}>
      <Text>PRESS</Text>
     </TouchableOpacity>
    </View>
  );

}