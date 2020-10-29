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
      <OTPInputView
        style={{width: '80%', height: 200}}
        pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={{width:30,height: 45,borderWidth: 0,borderBottomWidth: 1}}
        codeInputHighlightStyle={{borderColor: "#03DAC6"}}
        onCodeFilled = {(code) => {
          console.log(`Code is ${code}, you are good to go!`)
        }}
        />
    </View>
  );

}