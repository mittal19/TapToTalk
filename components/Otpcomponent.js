import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';


export function Otpcomponent({route,navigation})
{
  const {Phonenumber,requestId} = route.params;
  console.log(Phonenumber+" "+requestId);
  
  const otpnotrecieved=()=>{
    ToastAndroid.show('Enter phone number and Try Again',ToastAndroid.LONG);
    navigation.goBack();
  } 

  return(
    <View>
      <Text>Enter OTP</Text>
      <TextInput placeholder="_" />
      <TextInput placeholder="_" />
      <TextInput placeholder="_" />
      <TextInput placeholder="_" />
      <TouchableOpacity ><Text>Enter</Text></TouchableOpacity>
      <Text>OR</Text>
      <TouchableOpacity onPress={otpnotrecieved}><Text>Didn't recieved OTP on {Phonenumber} ?</Text></TouchableOpacity>
    </View>
  );

}