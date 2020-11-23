import React from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../helpers/context';

export function component_userDetails({route,navigation})
{
    const {logIn} = React.useContext(AuthContext); 

    const {userNumber} = route.params;
    
    const [userName,set_userName] = React.useState('');
    const [userStatus,set_userStatus] = React.useState('');
    const [userProfile,set_userProfile] = React.useState('');

    const function_submitDetails =async()=>
    {
        try
        {
            if(userName.length<1||userProfile.length<1||userStatus.length<1)
            {
                ToastAndroid.show("Enter all details",ToastAndroid.LONG);
            }
            else
            {
                await AsyncStorage.setItem('userNumber',userNumber);
                await AsyncStorage.setItem('userName',userName);
                await AsyncStorage.setItem('userStatus',userStatus);
                await AsyncStorage.setItem('userProfile',userProfile);
                logIn(userNumber,userName,userStatus,userProfile); 
            }
        }
        catch(e)
        {
            ToastAndroid.show("Some error occurred! Try again",ToastAndroid.LONG);
            navigation.pop();
        }
    }

    return(
        <View>
            <TextInput
                placeholder="Enter User Name"
                value={userName}
                onChangeText={set_userName}
            />
            <TextInput
                placeholder="Enter User status"
                value={userStatus}
                onChangeText={set_userStatus}
            />
            <TextInput
                placeholder="Enter Profile"
                value={userProfile}
                onChangeText={set_userProfile}
            />
            <TouchableOpacity onPress={function_submitDetails}>
                <Text>Confirm</Text>
            </TouchableOpacity>
        </View>
    )
}