import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,Platform,PermissionsAndroid,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context';
import Contacts from 'react-native-contacts';

//import firebase from "firebase";
//import firestore from "@react-native-firebase/firestore";

export function contactscomponent()
{
  
  /*const [state,setcontacts] = useState({
    contacts:[]
  });*/
  const [findingcontacts,foundcontacts] = useState(true);
  state = 
  {
    //Assing a array to your pokeList state
    contacts: [],
    //Have a loading state where when data retrieve returns data. 
    //loading: true
  }

  useEffect(()=>{
      async function functionname(){
        if (Platform.OS == 'android') {
            try {
              const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) 
              {
                console.log("You can read the phone state");
                console.log(state.contacts);
                await Contacts.getAll().then(contactsobj=>{
                  //console.log(JSON.stringify(contactsobj,null,'\t'));
                  /*const contacts= contactsobj;
                  setcontacts(state=>({
                    contacts:[...state.contacts,contacts]
                  }));*/
                  state.contacts=contactsobj
                }); 
                console.log(state.contacts);
                //state.loading=false;
                foundcontacts(false);
              }
              else 
              {
                console.log("permission denied")
              }
            } catch (err) {
              console.warn(err)
            }
          }
      }
      functionname();
    },[]);
  
  if(findingcontacts==true)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  return( 
    <View style={{flex:1}}>
      <Text>CONTACTS</Text>     
      <View style={{backgroundColor:'#324aca',flex:1}}>
      {state.contacts.map((contact, index) => (
          <Text style={{backgroundColor:'#fff'}}>Hello {contact.displayName}</Text>
    ))}
    </View>
    </View>
  );
}