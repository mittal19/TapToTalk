//https://github.com/tttstudios/react-native-otp-input

import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export function Otpcomponent({route,navigation})
{
  const {Phonenumber,requestId} = route.params;
  console.log(Phonenumber+" "+requestId);
  
  const [otpentered,enterotp] = React.useState(false);
  const [otp,setotp] = React.useState('');
  const [verifyingotp,verifyotp] = React.useState(false);

  const otpnotrecieved=()=>{
    ToastAndroid.show('Enter phone number and Try Again',ToastAndroid.LONG);
    navigation.goBack();
  }

  const checkotp=async()=>{
    console.log(otp);
    if(otp.length==4)
    {
      verifyotp(true);
      try
      {
        const temp = await fetch('http://192.168.43.13:3000/verify',{
                                method:'POST',
                                headers:{
                                  'Accept': 'application/json',
                                  'Content-type': 'application/json'
                                },
                                body:JSON.stringify(
                                {
                                  "requestId":requestId,
                                  "code":otp
                                })
                              });
        const res = await temp.json();
        console.log(res);
        verifyotp(false);
        if(res.status==0&&res.event_id!=null)
        {
          //console.log("success");
        }
        else if(res.status==16&&res.error_text=="The code provided does not match the expected value")
        {
          ToastAndroid.show("Wrong OTP entered! Try again.",ToastAndroid.LONG);
        }
        else
        {
          ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);
          navigation.goBack();
        }

      }catch(error)
      {
        console.log(error);
        verifyotp(false);
        ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);
        navigation.goBack();
      }
    }
  }

  if(verifyingotp==true)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
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
          onCodeChanged = {(code)=>{
            if(code.length<4)
              enterotp(false);
          }}
          onCodeFilled = {(code) => {
            //console.log(code);
            setotp(code);
            enterotp(true);
          }}
          />

        <TouchableOpacity style={[{backgroundColor:otpentered?"#00FF00":"#f0f0f0"}]} onPress={checkotp}><Text>Login</Text></TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity onPress={otpnotrecieved}><Text>Didn't recieved OTP on {Phonenumber} ?</Text></TouchableOpacity>
 
    </View>
  );

}