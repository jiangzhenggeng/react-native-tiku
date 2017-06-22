import React from 'react';
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

export default class extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return Platform.OS=='ios'?<TouchableHighlight {...this.props} />:
            <TouchableNativeFeedback {...this.props} />
    }
}

