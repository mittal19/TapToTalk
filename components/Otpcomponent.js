//https://github.com/tttstudios/react-native-otp-input

import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

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
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          autoFocusOnLoad
          keyboardType="phone-pad"
          codeInputFieldStyle={{width:30,height: 45,borderWidth: 0,borderBottomWidth: 1,color:'#000000'}}
          codeInputHighlightStyle={{borderColor: "#000000"}}
          onCodeFilled = {(code) => {
            console.log(`Code is ${code}, you are good to go!`)
            }}
          />
        <TouchableOpacity ><Text>Enter</Text></TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity onPress={otpnotrecieved}><Text>Didn't recieved OTP on {Phonenumber} ?</Text></TouchableOpacity>

    </View>
  );

}