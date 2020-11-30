import React,{useState,useCallback,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {firebase} from './firebaseConfig'; ///importing firebase configs from firebaseconfig.js file

export function component_message({route,navigation})
{
  const details = route.params;

  const dbref = firebase.database().ref();     //setting reference to real time database
  const [messages, setMessages] = useState([]);
  const [isNew,set_isNew] = useState('');

  useEffect(() => 
  {
    console.log(details['userNumber'].userNumber+" "+details['item'].userNumber);
    const query = dbref.child('chats').child(details['userNumber'].userNumber).child(details['item'].userNumber);
    query.on('value',snap=>
    {
      console.log(snap);

      if(JSON.stringify(snap)==="null")
      {
        set_isNew(true);
        setMessages([]);
      }
      else
      {
        set_isNew(false);
        setMessages([
          {
            _id: 1,       ///id keep increasing with every message
            text: 'Do you love Gifted Chat? (radio) KEEP IT',
            createdAt: new Date(),
            user: {
              _id: 1,      ////this id determine whether this message in send or recieve
              name: 'React Native',
            },
          },

          {
            _id: 2,
            text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
            },
          },

          {
            _id: 3,
            text: 'Chat? (checkbox)',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
            },
          }
        
        ])
      }
    })
  }, [])
 
  const onSend = useCallback((messages = []) => 
  {
    if(isNew == true)
    {
      var updates={};
      var path = '/chats/'+details['userNumber'].userNumber+'/'+details['item'].userNumber;
      var chatId;
      if(details['userNumber'].userNumber<=details['item'].userNumber)
      {
        chatId = details['userNumber'].userNumber+"_"+details['item'].userNumber;
      }
      else
      {
        chatId = details['item'].userNumber+"_"+details['userNumber'].userNumber;
      }
      updates[path]=chatId;
      dbref.update(updates);
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id:2,    //my id here
      }}
    />
  )
}