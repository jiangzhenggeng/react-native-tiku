import React from 'react';
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

export default  {
    Toast(string,time=1000){

    },

    render() {
        return Platform.OS=='ios'?<TouchableHighlight {...this.props} />:
            <TouchableNativeFeedback {...this.props} />
    }
}

