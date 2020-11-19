// THIS COMPONENT WILL RETRIVE CONTACTS FROM DEVICE.
// THEN FILTER OUT THE UNNECESSARY DATA
//THEN CHECK WHICH CONTACTS HAVE ACCOUNT ON TAPTOTALK


import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,Platform,PermissionsAndroid,ActivityIndicator, ToastAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCi1keL-EFQAFXooPa0or-XHyOrtu5iSoY",
  authDomain: "taptotalk-113dd.firebaseapp.com",
  databaseURL: "https://taptotalk-113dd.firebaseio.com",
  projectId: "taptotalk-113dd",
  storageBucket: "taptotalk-113dd.appspot.com",
  messagingSenderId: "526283056723",
  appId: "1:526283056723:web:061d836d82fc6305a988a6",
  measurementId: "G-7HFEC2PNE6"
};
if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);

export function contactscomponent()
{
  
  const [isLoading, setLoading] = useState(true);  //isloading will help in adding activity indicator while contacts are being accessed
  const [data, setData] = useState([]);  // data will hold contacts

  useEffect(()=>
  {
      async function functionname()   //creating a function with name of 'functionname' 
      {

        const dbref = firebase.database().ref();

        if (Platform.OS == 'android') 
        {
          try 
          {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);  // getting permission to  access contacts 
            
            if (granted === PermissionsAndroid.RESULTS.GRANTED)   // if permission is granted
            {
              var id=0;   // index to add in object
              var data=[];    // making data array to store filtered contacts
              
              await Contacts.getAll().then(contacts=>     //Contacts.getAll wil get us phone contacts
                {     
                  for(var i=0; i<contacts.length; i++)   //looping 
                  { 
                    if(contacts[i].phoneNumbers.length!=0)   // preventing to add contacts with no phone number
                    {
                      data.push(
                                  { 
                                    id:id, 
                                    displayName: contacts[i].displayName, 
                                    phoneNumber: contacts[i].phoneNumbers[0].number, 
                                    profile: "linkhere",
                                    onWhatsapp : "false"
                                  }  //making object of information before adding to array
                                );  // adding valid contacts to data array
                      id++;
                    }
                  }
                   
                  data.sort(function(a, b){
                    return a.displayName.toLowerCase()>b.displayName.toLowerCase();
                  });   // sorting the data array of objects we built above ignoring upper lower case

                  setData(data); // set above data array to context till now we have filtered contacts only not checked whether number is on our database or not.
                  setLoading(false);  // setting activity indicator to false  
                }
              );

              for(var i=0;i<id;i++)
              {
                console.log(data[i].phoneNumber);
                const userdata = await dbref.child('users').child(data[i].phoneNumber).once('value').then(
                function(snap)
                {
                  snap = snap.val();
                  return snap;
                });
                console.log(userdata);
              }
            }
            else 
            {
              console.log("permission denied"); 
              navigation.goBack();   //permission denied to access contacts // going one screen back
              ToastAndroid.show("Permission to access contacts denied",ToastAndroid.LONG);  
            }
          }
          catch (err) 
          {
            console.log(err);
            navigation.goBack();  //some error occurred going one screen back
            ToastAndroid.show("Some error occured",ToastAndroid.LONG);
          }
        }
  
      }

      functionname();    //calling above function

    },[]);

  if(isLoading==true)   // showing activity indicator till contacts are not fetched from device
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
          data={data}     // data state we created above
          keyExtractor={({ id }, index) => id.toString()}     // 'id' is the object property we created at time of filtering data
          renderItem={({ item }) => (
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:6}}>
              <Text>{item.displayName}</Text>    
              <Text>{item.onWhatsapp}</Text>
            </View>
          )}
        />
    </View>
  );
}


// DEVELOPED BY - PRIYANSHU MITTAL  (REACT NATIVE DEVELOPER , JAVA DEVELOPER , COMPETITIVE PROGRAMMER )