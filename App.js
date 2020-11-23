import React,{useEffect} from 'react';
import {View,ActivityIndicator,ToastAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './helpers/context';
import {Reduceractions} from './helpers/Reduceractions';    
import {initialLogin} from './helpers/initialLogin';

import {component_userNumber} from './components/component_userNumber';
import {component_home} from './components/component_home';
import {component_otp} from './components/component_otp';
import {component_contacts} from './components/component_contacts';
import {component_message} from './components/component_message';
import {component_userDetails} from './components/component_userDetails';

const Stack = createStackNavigator();    //for creating navigation between screens possible using stack navigator

function App()
{
  
  const [loginState,dispatch] = React.useReducer(Reduceractions,initialLogin);   //intializing reducer

  const authContext = React.useMemo(()=>({        //creating authcontext .. the function created here will be accessible all in the app
    
          logIn: async(userNumber,userName,userStatus,userProfile,navigation)=> 
          {      
            dispatch({type:'LOGIN',userNumber:userNumber,userName:userName,userStatus:userStatus,userProfile:userProfile});
          },

          logOut: async()=> 
          {   //for signing user out
    
            try
            {
              //removing usertoken and phone number from local storage
              await  AsyncStorage.removeItem('userNumber');
              await  AsyncStorage.removeItem('userStatus');
              await  AsyncStorage.removeItem('userName');
              await  AsyncStorage.removeItem('userProfile');
              dispatch({type:'LOGOUT'});
            } 
            catch(e)
            {
              ToastAndroid.show("Some error occurred! Try again",ToastAndroid.LONG);
            }
          },

  }),[]);

  useEffect(()=>
  {             //this will be automattically called is similar to component did mount
     
    setTimeout(async()=>
    {
    
      let userNumber = null;      //will store phonenumber
      let userName = null;
      let userProfile = null;
      let userStatus = null;
      
      try
      {
        userNumber = await AsyncStorage.getItem('userNumber');      //getting phonenumber from storage
        userName = await AsyncStorage.getItem('userName');
        userProfile = await AsyncStorage.getItem('userProfile');
        userStatus = await AsyncStorage.getItem('userStatus');
      }
      catch(e)
      {
        console.log(e);       //showing error
      }
      
      dispatch({type:'RETRIEVE_STORED_DATA',userNumber:userNumber,userName:userName,userProfile:userProfile,userStatus:userStatus});       //calling the reducer function we created above
    
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
      {loginState.userNumber == null ?  
        <Stack.Navigator>
          <Stack.Screen name="Phone Number" component={component_userNumber} />
          <Stack.Screen name="OTP" component={component_otp} />
          <Stack.Screen name="EnterDetails" component={component_userDetails} />
        </Stack.Navigator>
        :
        <Stack.Navigator> 
              
          <Stack.Screen name="Home" component={component_home} />
          <Stack.Screen name="Contacts" component={component_contacts} />
          <Stack.Screen name="Message" component={component_message} />
        </Stack.Navigator>
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App; 