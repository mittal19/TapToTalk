import React from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';

export function Phonenumbercomponent({navigation})
{
  
  const [userPhone,setuserPhone] = React.useState('');

  const sendOTPhandle = ()=>{

    if( !(/^\d+$/.test(userPhone)) || userPhone.length<10 )
    {  
      console.log(false);
      ToastAndroid.show("Enter a number with 10 digits only!", ToastAndroid.LONG);
    }
    else
    {
      console.log(true);
      navigation.push('OTP',{Phonenumber:userPhone});
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