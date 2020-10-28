import React,{useEffect} from 'react';
import {View,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AysncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './context';
import {Phonenumbercomponent} from './screen/Phonenumbercomponent';
import {homecomponent} from './screen/homecomponent';
import {Otpcomponent} from './screen/Otpcomponent';

const Stack = createStackNavigator();

function App()
{
  const initialLogin = 
  {
    isLoading:true,
    userPhone:null,
    userToken:null
  };

  const loginReducer = (prevState,action)=>
  {
    switch(action.type)
    {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
          userPhone:action.id
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken:null,
          isLoading:false,
          userPhone:null
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
          userPhone:action.id
        };
    }
  };

  const [loginState,dispatch] = React.useReducer(loginReducer,initialLogin);

  const authContext = React.useMemo(()=>({
    signIn: async(userPhone,password)=> {
      let userToken;
      userToken = null;
      if(userPhone=='user'&&password=='pass')
      {
        try{
          userToken='sdf';
          await AysncStorage.setItem('userToken',userToken);
        }catch(e)
        {
          console.log(e);
        }
      }
      dispatch({type:'LOGIN',id:userPhone,token:userToken});
    },
    signOut: async()=> {
     
      try{
        await AysncStorage.removeItem('userToken');
      } catch(e){
        console.log(e);
      }

      dispatch({type:'LOGOUT'});
    },
    signUp:() =>{
      setUserToken('sdfg');
      setIsLoading(false);
    }
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
      
      let userToken = null;
     
      try{
        userToken=await AysncStorage.getItem('userToken');
      } catch(e){
        console.log(e);
      }
      
      dispatch({type:'RETRIEVE_TOKEN',token:userToken});
    },1000);
  },[]);

  if(loginState.isLoading)
  {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

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
        </Stack.Navigator>
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App; 