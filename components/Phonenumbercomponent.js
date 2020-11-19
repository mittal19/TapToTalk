import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';

export function Phonenumbercomponent({navigation})
{
  
  const [userPhone,setuserPhone] = React.useState('');    // state for holding phone number
  const [sendingotp,otpsent] = React.useState(false);    // state for showing activity indicator

  const sendOTPhandle = async()=>        //function which will be called when user clicks on send otp
  {

    if( !(/^\d+$/.test(userPhone)) || userPhone.length<10 )       //checking validity of phone number
    {  
      ToastAndroid.show("Enter a number with 10 digits only!", ToastAndroid.LONG);    //showing toast if entered number is not properly formatted
    }
    else   //if number is formatted right
    {
      try{
        otpsent(true);     //setting activityindicator to true . now indicator will show on.

        /*const temp = await fetch('http://192.168.43.13:3000/request',{   //go in dev settings of phone by open developer mode by typing d in nodejs server then go to debug server host and enter ip adreess like 192.168.43.13:8081 . here 8081 is mobile port number. keep local host port number 3000
                            method:'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-type': 'application/json'
                            },
                            body: JSON.stringify(
                              {
                                "number":"+919027504141"  // instead of hardcode 9027504141 use like this -> "+91"+userPhone
                              })
                            });
        const requestId= await temp.json();
        console.log(requestId);*/
        ToastAndroid.show("OTP sent",ToastAndroid.SHORT);  //otp sent success
        otpsent(false);     //now setting activityindicator to false n thus hiding it.
        navigation.navigate('OTP',{Phonenumber:userPhone,requestId:12323});      //navigating to OTP screen. passing some information like phonenumber and requestID to next screen
      }
      catch(err)     //error catched if some
      { 
        console.log(err);            
        otpsent(false);        //hiding activity indicator
        ToastAndroid.show("Some error occurred. Try again.",ToastAndroid.LONG);  //toasting error
      }
    }
  }

  if(sendingotp==true)           //if otp is not sent then show activity indicator 
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  return(
    <View>
      <TextInput
        placeholder="Enter 10 digit Phone number"
        keyboardType='phone-pad'
        value={userPhone}
        onChangeText={setuserPhone}
        maxLength={10}
      />
     <TouchableOpacity onPress={sendOTPhandle}>
      <Text>Send OTP</Text>
     </TouchableOpacity>
    </View>
  );

}