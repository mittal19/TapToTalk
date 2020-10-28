import React from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';

export function Phonenumbercomponent({navigation})
{
  
  const [userPhone,setuserPhone] = React.useState('');

  const sendOTPhandle = async()=>{

    if( !(/^\d+$/.test(userPhone)) || userPhone.length<10 )
    {  
      console.log(false);
      ToastAndroid.show("Enter a number with 10 digits only!", ToastAndroid.LONG);
    }
    else
    {
      console.log(true);
      const ans = await fetch('http://192.168.43.13:3000/request',{   //go in dev settings of phone by open developer mode by typing d in nodejs server then go to debug server host and enter ip adreess like 192.168.43.13:8081 . here 8081 is mobile port number. keep local host port number 3000
                    method:'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({"number":"+919027504141"})
                    });
      const anss= await ans.json();
      console.log(anss);
      //console.log(ans);
      //navigation.push('OTP',{Phonenumber:userPhone});
    }
    
  }

  return(
    <View>
      <TextInput
        placeholder="Enter 10 digit Phone number"
        keyboardType='phone-pad'
        onChangeText={setuserPhone}
        maxLength={10}
      />
     <TouchableOpacity onPress={sendOTPhandle}>
      <Text>Send OTP</Text>
     </TouchableOpacity>
    </View>
  );

}