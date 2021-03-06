// THIS COMPONENT WILL RETRIVE CONTACTS FROM DEVICE.
// THEN FILTER OUT THE UNNECESSARY DATA
//THEN CHECK WHICH CONTACTS HAVE ACCOUNT ON TAPTOTALK
//THEN USER CAN CLICK ON A CONTACT TO NAVIGATE TO PERSONAL MESSAGE SCREEN OF SELECTED CONTACT

import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,FlatList,Platform,PermissionsAndroid,ActivityIndicator, ToastAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {firebase} from './firebaseConfig'; ///importing firebase configs from firebaseconfig.js file

export function component_contacts({route,navigation})
{

  const userNumber = route.params;
  
  const [isLoading, set_isLoading] = useState(true);  //isloading will help in adding activity indicator while contacts are being accessed
  const [data, set_data] = useState([]);  // data will hold contacts

  useEffect(()=>
  {
      async function functionname()   //creating a function with name of 'functionname' 
      {

        const dbref = firebase.database().ref();     //setting reference to real time database

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
                                    userName: contacts[i].displayName, 
                                    userNumber: contacts[i].phoneNumbers[0].number, 
                                    userprofile: "linkhere",
                                    onTapToTalk : "false"
                                  }  //making object of information before adding to array
                                );  // adding valid contacts to data array
                      id++;
                    }
                  }
                   
                  data.sort(function(a, b){
                    return a.userName.toLowerCase()>b.userName.toLowerCase();
                  });   // sorting the data array of objects we built above ignoring upper lower case

                  set_data(data); // set above data array to context till now we have filtered contacts only not checked whether number is on our database or not.
                  set_isLoading(false);  // setting activity indicator to false  
                }
              );

              const query = await dbref.child('users');     //setting reference to users document . users document  structure as follows -   users : { "9027504141": { "profile":linkhere ,"status": hey there},"9027504141": { "profile":linkhere ,"status": hey there} } 
              const usersdata = await query.once('value').then(
                function(snap)
                {
                  return snap.val();
                }
              )    //saving all users info in usersdata variable
             
              for(var i=0;i<id;i++)    //looping to check whether our contacts are present in database or not
              {
                if(usersdata[data[i].userNumber]!=undefined)          // data[i].phoneNumber represent the contact in our phone . usersdata[data[i].phoneNumber] is checking the contact on our phone is present in usersdata object or not.
                {
                  data[i].onTapToTalk = "true";     // if usersdata(our firebase database) have the contact then set on whatsapp to true
                  data[i].userprofile = usersdata[data[i].profile];   // setting profile image link
                }
              }
              set_data(data);   //setting data
              
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

  const openpersonalmessage = (item)=>{            //this function will be called when user clicks on specific contact to begin chatting
    if(item.onTapToTalk=="false")       //checking if the contact user clicked on is on taptotalk or not
    {
      ToastAndroid.show("Not on TapToTalk! Invite them here.",ToastAndroid.LONG);        //if not then show this
    }
    else  //if user is on taptotalk
    {
      navigation.pop();  //this will poput current contacts component screen 
      navigation.navigate('Message',{item,userNumber});       //this will navigate  to message component
    }
  }

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
            <TouchableOpacity onPress={()=>openpersonalmessage(item)}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:6}}>
                <Text>{item.userName}</Text>
                <Text>{item.onTapToTalk}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
    </View>
  );
}


// DEVELOPED BY - PRIYANSHU MITTAL  (REACT NATIVE DEVELOPER , JAVA DEVELOPER , COMPETITIVE PROGRAMMER )