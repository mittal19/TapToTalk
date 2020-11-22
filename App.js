import React,{useEffect} from 'react';
import {View,ActivityIndicator,ToastAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AysncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './context';

import {Phonenumbercomponent} from './components/Phonenumbercomponent';
import {homecomponent} from './components/homecomponent';
import {Otpcomponent} from './components/Otpcomponent';
import {contactscomponent} from './components/contactscomponent';
import {messagecomponent} from './components/messagecomponent';

const Stack = createStackNavigator();    //for creating navigation between screens possible using stack navigator

function App()
{
  const initialLogin =        //creating pbject with following properties
  {
    isLoading:true,           //for showing/hiding activity indicator
    Phonenumber:null,            //for storing phone number
    userToken:null     //for storing usertoken
  };

  const loginReducer = (prevState,action)=>
  {
    switch(action.type)
    {
      case 'RETRIEVE_TOKEN':      //when token and phone number is retrieved from storage this is called
        return {
          ...prevState,     //all previous states will remain as it is
          userToken:action.token,   //setting token
          isLoading:false,         //hiding activity indicator
          Phonenumber:action.id    //setting phone number
        };
      case 'LOGIN':          //when otp is verified ..this is called
        return {
          ...prevState,    //all previous states will remain as it is
          userToken:action.token,                
          isLoading:false,
          Phonenumber:action.id
        };
      case 'LOGOUT':                //when logging out this is called
        return {
          ...prevState,    //all previous states will remain as it is
          userToken:null,
          isLoading:false,
          Phonenumber:null
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
          Phonenumber:action.id
        };
    }
  };

  const [loginState,dispatch] = React.useReducer(loginReducer,initialLogin);   //intializing reducer

  const authContext = React.useMemo(()=>({        //creating authcontext .. the function created here will be accessible all in the app
    signIn: async(requestId,otp,Phonenumber,navigation)=> {          //signIn function for signing user in
      let userToken;
      userToken = null;
      
      try
      {
       // console.log('idsnf');   
        /*const temp = await fetch('http://192.168.43.13:3000/verify',{   //this whole fetch will verfiy otp and other data recieved from otp component
                                method:'POST',
                                headers:{
                                  'Accept': 'application/json',
                                  'Content-type': 'application/json'
                                },
                                setTimeout:500,
                                body:JSON.stringify(
                                {
                                  "requestId":requestId,
                                  "code":otp
                                })
                              });*/
        //console.log('dfsfs');
        //const res = await temp.json();        //the res will be a object containg status and event_id
        //console.log('fsddf');
        //console.log(res);
        const res = {status:0,event_id:4252};        //this is temporary line as we have commented out above otp checking code
        if(res.status==0&&res.event_id!=null)     //if these conditions are true we have successfully cehched otp and its correct
        {
          //console.log("success");
          userToken='weef';         //manually setting usertoken ..to store in local storage...actually i can delete whole use of usertoken but anyways
          await AysncStorage.setItem('userToken',userToken);  //setting usertoken to phone storage
          await AsyncStorage.setItem('Phonenumber',Phonenumber);  //setting number to ''    ''
        }
        else if(res.status==16&&res.error_text=="The code provided does not match the expected value")
        {
          ToastAndroid.show("Wrong OTP entered! Try again.",ToastAndroid.LONG);     //wrong OTP  //re enter
        }
        else
        {
          ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);   //erro occurred while checking otp
          navigation.goBack();     //go back n try again
        }

      }catch(error)
      {
        console.log(error);
        //verifyotp(false);
        ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);
        navigation.goBack();  //error occurred . go back n try again
      }

      dispatch({type:'LOGIN',id:Phonenumber,token:userToken});   // reducer function we created above is called now for setting values
    },
    signOut: async()=> {   //for signing user out
     
      try{
        await AysncStorage.removeItem('userToken');      //removing usertoken and phone number from local storage
        await  AsyncStorage.removeItem('Phonenumber');
      } catch(e){
        console.log(e);
      }

      dispatch({type:'LOGOUT'});
    },
    signUp:() =>{        //for signing user up .. but i dont think its of use .. might remove later..please check future me
      setUserToken('sdfg');
      setIsLoading(false);
    }
  }),[]);

  useEffect(()=>{             //this will be automattically called is similar to component did mount
     
    setTimeout(async()=>{
      
      let userToken = null;        //will store usertoken
      let Phonenumber = null;      //will store phonenumber
     
      try
      {
        userToken=await AysncStorage.getItem('userToken');        //getting usertoken from storage
        Phonenumber=await AsyncStorage.getItem('Phonenumber');      //getting phonenumber from storage
      }
      catch(e)
      {
        console.log(e);       //showing error
      }
      
      dispatch({type:'RETRIEVE_TOKEN',token:userToken,id:Phonenumber});       //calling the reducer function we created above
    },1000);    //settime out of 1000ms is just for showing activity indicator...no real use here of settimeout 

  },[]);

  if(loginState.isLoading)          //displaying activity indicator of isloading is true
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  //if usertoken is null then we have to  show phone number screen 
  //if usertoken is not null then we have to show home component

  return(
    <AuthContext.Provider value={authContext}> 
      <NavigationContainer>
      {loginState.userToken == null ?  
        <Stack.Navigator>
          <Stack.Screen name="Phone Number" component={Phonenumbercomponent} />
          <Stack.Screen name="OTP" component={Otpcomponent} />
        </Stack.Navigator>
        :
        <Stack.Navigator> 
          <Stack.Screen name="Home" component={homecomponent} />
          <Stack.Screen name="Contacts" component={contactscomponent} />
          <Stack.Screen name="Message" component={messagecomponent} />
        </Stack.Navigator>
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App; 