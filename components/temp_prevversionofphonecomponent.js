import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';

export function Phonenumbercomponent()
{
  
  const [userPhone,setuserPhone] = React.useState('');
  const [password,setPassword] = React.useState('');
  const {signIn} = React.useContext(AuthContext);

  const loginhandle = ()=>{

    signIn(userPhone,password);
  }

  return(
    <View>
      <TextInput
        placeholder="Enter 10 digit Phone number"
        keyboardType='phone-pad'
        onChangeText={setuserPhone}
        maxLength={10}
      />
      <TextInput
        placeholder="Enter Password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
     <TouchableOpacity onPress={loginhandle}>
      <Text>PRESS</Text>
     </TouchableOpacity>
    </View>
  );

}