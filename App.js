import React,{Component,useEffect,useReducer} from 'react';
import {View,Text,TextInput,TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AysncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './context';
import {Signincomponent} from './screen/Signincomponent';
import {homecomponent} from './screen/homecomponent';

const Stack = createStackNavigator();

function App()
{
  
  //const [isLoading,setIsLoading] = React.useState(true);
  //const [userToken,setUserToken] = React.useState(null);

  const initialLogin = {
    isLoading:true,
    userName:null,
    userToken:null
  };

  const loginReducer = (prevState,action)=>{
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
          userName:action.id
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken:null,
          isLoading:false,
          userName:null
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
          userName:action.id
        };
    }
  };

  const [loginState,dispatch] = React.useReducer(loginReducer,initialLogin);

  const authContext = React.useMemo(()=>({
    signIn: async(userName,password)=> {
      //setUserToken('asdf');
      //setIsLoading(false);
      let userToken;
      userToken = null;
      if(userName=='user'&&password=='pass')
      {
        try{
          userToken='sdf';
          await AysncStorage.setItem('userToken',userToken);
        }catch(e)
        {
          console.log(e);
        }
      }
      dispatch({type:'LOGIN',id:userName,token:userToken});
    },
    signOut: async()=> {
      //setUserToken(null);
      //setIsLoading(false);
      
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
      //setIsLoading(false);
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
          <Stack.Screen name="Sign in" component={Signincomponent} />
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