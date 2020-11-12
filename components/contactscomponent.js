import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,Platform,PermissionsAndroid,ActivityIndicator, ToastAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';

export function contactscomponent()
{
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>
  {
      async function functionname()
      {
        if (Platform.OS == 'android') 
        {
          try 
          {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            
            if (granted === PermissionsAndroid.RESULTS.GRANTED) 
            {
              Contacts.getAll().then(contacts=>
                {
                  contacts.sort(function(a, b){
                    //var temp=a.displayName.toLowerCase();
                    console.log(typeof b.displayName);
                    return a.displayName>b.displayName;
                  });
                  setData(contacts);
                  setLoading(false);
                  
                  var data = [];
                  var id=0;
                  for(var i=0; i<contacts.length; i++)  
                  {
                    if(contacts[i].phoneNumbers.length!=0)
                    {
                      data.push(
                                  {
                                    id:id, 
                                    displayName: contacts[i].displayName, 
                                    phoneNumber: contacts[i].phoneNumbers[0].number, 
                                    onWhatsapp:false
                                  }
                                );
                      id++;
                    }
                  }
                  console.log(JSON.stringify(data,null,'\t'));
                  console.log(data.length);
                  
                }
              ); 
            }
            else 
            {
              console.log("permission denied");
              navigation.goBack();
              ToastAndroid.show("Permission to access contacts denied",ToastAndroid.LONG);
            }
          }
          catch (err) 
          {
            console.log(err);
            navigation.goBack();
            ToastAndroid.show("Some error occured",ToastAndroid.LONG);
          }
        }
        
      }
      functionname();
    },[]);

  if(isLoading==true)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  return( 
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList
          data={data}
          keyExtractor={({ recordID }, index) => recordID}
          renderItem={({ item }) => (
            <Text>{item.displayName}</Text>
          )}
        />
    </View>
  );
}