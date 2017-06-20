
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Picker,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import styles from './styles';
export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue:1,
        };
    }

    render(){
        return (
            <View style={styles.PickerWrap}>
                <Picker
                    selectedValue={this.state.selectedValue}
                    onValueChange={(value)=>this.setState({selectedValue: value})}
                    prompt={'请选择'}
                    style={{flex:1}}
                >
                    <Picker.Item label='借' value='1'/>
                    <Picker.Item label='贷' value='2'/>
                </Picker>
            </View>
        );
    }
}