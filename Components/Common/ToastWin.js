import React from 'react';
import {
    ToastAndroid,
    Platform
} from 'react-native';

export default  {
    Toast(string,time=1000){
        if(Platform.OS=='android'){
            ToastAndroid.show(String(string),time==1000?ToastAndroid.SHORT:ToastAndroid.LONG);
        }
    },
}

