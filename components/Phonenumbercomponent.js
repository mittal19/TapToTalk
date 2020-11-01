import React,{useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';

export function Phonenumbercomponent({navigation})
{
  
  const [userPhone,setuserPhone] = React.useState('');
  const [sendingotp,otpsent] = React.useState(false);

  const sendOTPhandle = async()=>
  {

    if( !(/^\d+$/.test(userPhone)) || userPhone.length<10 )
    {  
      //console.log(false);
      ToastAndroid.show("Enter a number with 10 digits only!", ToastAndroid.LONG);
    }
    else
    {
      //console.log(true);
      try{
        otpsent(true);
        const temp = await fetch('http://192.168.43.13:3000/request',{   //go in dev settings of phone by open developer mode by typing d in nodejs server then go to debug server host and enter ip adreess like 192.168.43.13:8081 . here 8081 is mobile port number. keep local host port number 3000
                            method:'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-type': 'application/json'
                            },
                            body: JSON.stringify(
                              {
                                "number":"+919027504141"  // "+91"+userPhone
                              })
                            });
        const requestId= await temp.json();
        console.log(requestId);
        ToastAndroid.show("OTP sent",ToastAndroid.SHORT);
        otpsent(false);
        navigation.navigate('OTP',{Phonenumber:userPhone,requestId:requestId.requestId});
      }catch(err)
      {
        console.log(err);
        otpsent(false);
        ToastAndroid.show("Some error occurred. Try again.",ToastAndroid.LONG);
      }
    }
  }

  if(sendingotp==true)
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