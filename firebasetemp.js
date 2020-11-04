import React from  'react';
import { Component } from 'react';
import {View,Text} from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
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



export default class firebasetemp extends Component
{
    constructor(props)
    {
        super(props);
        this.getuser();
    }

    getuser=async()=>
    {
        console.log('in');
        var database=firebase.database();
        var ref=database.ref();
        ref.on('value',snap=>{
            console.log(snap.key);
        });

    }
    render()
    {
        return(
            <View>
                <Text>g</Text>
            </View>
        );
    }
}