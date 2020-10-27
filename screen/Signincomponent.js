import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

export function Signincomponent()
{
  
  const [userName,setUserName] = React.useState('');
  const [password,setPassword] = React.useState('');
  const {signIn} = React.useContext(AuthContext);

  const loginhandle = ()=>{
    signIn(userName,password);
  }

  return(
    <View>
      <TextInput
        placeholder="Phone number"
        onChangeText={setUserName}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
      />
     <TouchableOpacity onPress={loginhandle}>
      <Text>PRESS</Text>
     </TouchableOpacity>
    </View>
  );

}