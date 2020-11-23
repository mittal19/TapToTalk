//https://github.com/tttstudios/react-native-otp-input

import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AuthContext} from '../helpers/context';

export function Otpcomponent({route,navigation}) 
{
  const {signIn} = React.useContext(AuthContext);         ///authcontext will get us signin function from app.js screen

  const {Phonenumber,requestId} = route.params;       // getting info from previous screen
  
  const [otpentered,enterotp] = React.useState(false);      //
  const [otp,setotp] = React.useState('');
  const [verifyingotp,verifyotp] = React.useState(false);

  const otpnotrecieved=()=>{         //this function gets executed when user press otp not recieved
    ToastAndroid.show('Enter phone number and Try Again',ToastAndroid.LONG);       //showing toast
    navigation.goBack();      // going back to previous screen which is phonenumber component
  }

  const checkotp=async()=>{          //this function will be called when user clicks login
    if(otp.length==4)                //checking if otp enterd is 4 digit or not
    { 
      signIn(requestId,otp,Phonenumber,navigation);       //if otp is properly formatted then send the data to signIn function created at App.js file using authcontext
    }
    else
    {
      ToastAndroid.show('Enter all 4 digits',ToastAndroid.LONG); //showing toast to enter proper otp.
    }
  }

  /*if(verifyingotp==true)          //displaying activity indicator
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }*/


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