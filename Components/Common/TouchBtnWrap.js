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
        return Platform.OS=='ios'?<TouchableHighlight {...this.props} style={[{flex:1},this.props.style]}/>:
            <TouchableNativeFeedback {...this.props} style={[{flex:1},this.props.style]} />
    }
}

