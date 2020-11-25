//https://github.com/ivpusic/react-native-image-crop-picker

import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function cameracomp()
{
    const oncapture=()=>{
        console.log("in");
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
          });
    }

    const onchoose=()=>{
        console.log("inn");
        ImagePicker.openPicker({
            mediaType: "video",
          }).then((video) => {
            console.log(video);
          });
    }

    return(
        <View>
            <TouchableOpacity onPress={oncapture}><Text>capture</Text></TouchableOpacity>
            <TouchableOpacity onPress={onchoose}><Text>choose</Text></TouchableOpacity>
        </View>
    );
}