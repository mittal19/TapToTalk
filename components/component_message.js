import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';

export function component_message({route,navigation}) 
{
  const details = route.params;
  console.log(details);

  return(
    <View>
       <Text>Enter OTP</Text>
       <Text>{details.displayName}</Text>
    </View>
  );

}