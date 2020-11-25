//This App.js file will have stack navigator for navigating between screens
// First of all when user open app - isLoading var is true so splash screen will show up
// BY that time useeffect function have settime out function whichh will load data from local storage
// and set it using dispatcher actions after 1000ms.
// if userNumber retrieved from local storage is null then enter phone number component will open 
//else if usernumber is not null then home component will open.


import React,{useEffect} from 'react';
import {View,ActivityIndicator,ToastAndroid,Text} from 'react-native';
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
  
  const [loginState,dispatch] = React.useReducer(Reduceractions,initialLogin);   //intializing reducer , Reduceractions imported, initialLogin imported

  const authContext = React.useMemo(()=>      //creating authcontext .. the functions created here will be accessible all in the app
  ({        
		logIn: async(userNumber,userName,userStatus,userProfile)=> // this function will be called by userDetails component 
		{      
			dispatch({type:'LOGIN',userNumber:userNumber,userName:userName,userStatus:userStatus,userProfile:userProfile});  // calling dispatcher action for login ... this action is in ./helpers/Reduceractions
		},

		logOut: async()=>		//for signing user out 
		{   
			try				//removing usernumber,status.. from local storage
			{ 
				await  AsyncStorage.removeItem('userNumber');
				await  AsyncStorage.removeItem('userStatus');
				await  AsyncStorage.removeItem('userName');
				await  AsyncStorage.removeItem('userProfile');
				dispatch({type:'LOGOUT'});           //calling dispatcher action for logging out ... this action is in ./helpers/Reduceractions 
			} 
			catch(e)
			{
				ToastAndroid.show("Some error occurred! Try again",ToastAndroid.LONG);
			}
		},

  }),[]);

  useEffect(()=>  //this will be automattically called is similar to component did mount
  {            
    setTimeout(async()=>
    {
      let userNumber = null;      //these variales will store data from local storage  
      let userName = null;
      let userProfile = null;
      let userStatus = null;
      
      try
      {
        userNumber = await AsyncStorage.getItem('userNumber');      //getting phonenumber,name,profile,status from storage
        userName = await AsyncStorage.getItem('userName');
        userProfile = await AsyncStorage.getItem('userProfile');
        userStatus = await AsyncStorage.getItem('userStatus');
      }
      catch(e)
      {
        console.log(e);       //showing error
      }
      
      dispatch({type:'RETRIEVE_STORED_DATA',userNumber:userNumber,userName:userName,userProfile:userProfile,userStatus:userStatus});        //calling dispatcher action for setting the data retrived ... this action is in ./helpers/Reduceractions 
    
    },1000);    //settime out of 1000ms is just for showing splash screen

  },[]);



  if(loginState.isLoading)          //displaying splash screen till isLoading is true
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#000000'}}>
		<Text style={{color:'#ffffff'}}>SPLASH SCREEN</Text>
      </View>
    );
  }

  //if userNumber is null then show login process else show loggedin screens 

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