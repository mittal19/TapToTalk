import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,Platform,PermissionsAndroid,ActivityIndicator} from 'react-native';
import Contacts from 'react-native-contacts';

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
                  setData(contacts)
                }
              ); 
                console.log(JSON.stringify({data},null,'\t'))
              setLoading(false);
            }
            else 
            {
              console.log("permission denied")
            }
          }
          catch (err) 
          {
            console.warn(err)
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