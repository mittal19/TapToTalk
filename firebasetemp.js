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
        var database=firebase.database();
        var ref=database.ref('customers');
        var customers = await ref.once('value').then(function(snap){
            snap = snap.val();
            return snap;
        });

        //console.log(customers);
        customers= Object.keys(customers)
        console.log(customers);
        var mynumber = "9027504441";
        var res = customers.find(customers=>customers==mynumber);   ///finding
        console.log(res);

        if(res==undefined)
        {
            var updates={};
            updates['/test/ffste']='sgdsgs';
            console.log(await database.ref().update(updates));   //updating or add
        }
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