import React,{useEffect} from 'react';
import {View,ActivityIndicator,ToastAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AysncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './context';
import {Phonenumbercomponent} from './components/Phonenumbercomponent';
import {homecomponent} from './components/homecomponent';
import {Otpcomponent} from './components/Otpcomponent';

const Stack = createStackNavigator();

function App()
{
  const initialLogin = 
  {
    isLoading:true,
    Phonenumber:null,
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
          Phonenumber:action.id
        };
      case 'LOGOUT':
        return {
          ...prevState,
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

  const [loginState,dispatch] = React.useReducer(loginReducer,initialLogin);

  const authContext = React.useMemo(()=>({
    signIn: async(requestId,otp,Phonenumber,navigation)=> {
      let userToken;
      userToken = null;
      
      try
      {
        console.log('idsnf');
        const temp = await fetch('http://192.168.43.13:3000/verify',{
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
                              });
        console.log('dfsfs');
        const res = await temp.json();
        console.log('fsddf');
        console.log(res);
        if(res.status==0&&res.event_id!=null)
        {
          //console.log("success");
          userToken='weef';
          await AysncStorage.setItem('userToken',userToken);
        }
        else if(res.status==16&&res.error_text=="The code provided does not match the expected value")
        {
          ToastAndroid.show("Wrong OTP entered! Try again.",ToastAndroid.LONG);
        }
        else
        {
          ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);
          navigation.goBack();
        }

      }catch(error)
      {
        console.log(error);
        //verifyotp(false);
        ToastAndroid.show("Some error occured! Try again,",ToastAndroid.LONG);
        navigation.goBack();
      }

      dispatch({type:'LOGIN',id:Phonenumber,token:userToken});
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