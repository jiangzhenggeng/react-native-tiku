
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
        this.accelements = require('../../../../../data/accelements.json').data;
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
                    {
                        this.accelements.map((item,index)=>{
                            if(item.children){
                                return item.children.map((item2,index2)=>{
                                    return <Picker.Item key={index+'-'+index2} label={item2.number+'-'+item2.accelementsname} color='#808080' value={item2.accelementsid}/>;
                                })
                            }else{
                                return <Picker.Item key={index} label={item.number+'-'+item.accelementsname} value={item.accelementsid} color='#000' />;
                            }
                        })
                    }
                </Picker>
            </View>
        );
    }
}