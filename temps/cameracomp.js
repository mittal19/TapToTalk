//https://github.com/ivpusic/react-native-image-crop-picker

import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
//import ImagePicker from 'react-native-image-picker';
import * as firebase from 'firebase';
import {firebaseConfig} from './components/firebaseConfig';
import RNFetchBlob from 'react-native-fetch-blob';

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig); 


export default function cameracomp()
{
    const [img,setimg] = React.useState('file:///storage/emulated/0/Android/data/com.taptotalkv4/files/Pictures/d0c6a388-dc4a-4c2a-8a13-3f3b3f0f9617.jpg');

    const oncapture=async()=>
    {
        
    }

    const onchoose=async()=>
    {
        await ImagePicker.openPicker(
            {
                width: 300,
                height: 400,
                cropping: true
            }).then(image => 
                {
                    console.log(image);

                    const projectStorage = firebase.storage();
                    const storageRef = projectStorage.ref('73ae1fdb-d2b2-4035-a813-9f06d401c856.jpg');
                    
                    storageRef.put(image).on('state_changed', (snap) => 
                    {
                        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                        //setProgress(percentage);
                    }, 
                    (err) => 
                    {
                        console.log(err);
                    }, 
                    async () => 
                    {
                        const url = await storageRef.getDownloadURL();
                        console.log(url);
                        //const createdAt = timestamp();
                        //await collectionRef.add({ url, createdAt });
                        //setUrl(url);
                    });
                }); 
    }

    return(
        <View>
            <TouchableOpacity onPress={oncapture}><Text>capture</Text></TouchableOpacity>
            <TouchableOpacity onPress={onchoose}><Text>choose</Text></TouchableOpacity>
            <Image
                style={{width:50,height: 50}}
                source={{uri:img}}
            />
        </View>
    );
}