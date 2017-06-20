
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
import PickerAccelements from './PickerAccelements';
import PickerMy from './PickerMy';

var randomId = ()=>{
    return 'ID'+String(Math.random()).replace('.','')+( ~ new Date());
};

export default class extends Component {

    constructor(props){
        super(props);
        this.state = {
            cell:[{
                id:randomId(),
                an_cell:{}
            },{
                id:randomId(),
                an_cell:{}
            }],
        };
        this.disabled = false;
        this.accNumber = this.props.accNumber;
        this.__uniqueid__ = this.accNumber.__uniqueid__;
        this.i = this.props.i;
    }

    sub(){
        if(this.state.cell.length<=2){
            alert('至少有两项');
            return;
        }
        this.state.cell.pop();
        this.setState({
            cell:this.state.cell
        },()=>{
            global.questionAnswer[this.i].user_answer.forEach((item,index)=>{
                if( item.__uniqueid__ == this.__uniqueid__ ){
                    global.questionAnswer[this.i].user_answer[index].__row_answer__.pop();
                }
            });
        });
    }
    add(){
        this.setState({cell:this.state.cell+1},()=>{
            global.questionAnswer[this.i].user_answer.forEach((item,index)=>{
                if(item.__uniqueid__==this.__uniqueid__){
                    global.questionAnswer[this.i].user_answer[index].__row_answer__.push({
                        id:randomId(),
                        an_cell:{}
                    });
                }
            });
        });
    }

    render() {

        return (
            <View style={{marginBottom:20}}>
                <View style={styles.accWrap}>
                    <View style={{marginBottom:10}}><Text style={{color:'#585858',fontSize:16}}>第{this.props.index}个分录</Text></View>
                    {this.state.cell.map((item,index)=>{
                        return (
                            <View key={index} style={styles.accCellRow}>
                                <View style={{width:85}}>
                                    <PickerMy />
                                </View>
                                <View style={{flex:1,marginLeft:5,marginRight:5}}>
                                    <PickerAccelements />
                                </View>
                                <View style={{width:85}}>
                                    <View style={styles.blankTextInputBox}>
                                        <TextInput
                                            style={styles.blankTextInput}
                                            onChangeText={ text => this.TextInputValue = text }
                                            placeholderTextColor="#bbb"
                                            defaultValue=""
                                            clearButtonMode="while-editing"
                                            underlineColorAndroid='transparent'
                                            selectionColor="#ffffff"
                                            enablesReturnKeyAutomatically={true}
                                            keyboardType="numeric"
                                            editable={!this.disabled}
                                        />
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity
                        style={[styles.PickerAdd,{marginRight:5,width:42}]}
                        onPress={this.sub.bind(this)}
                    >
                        <Text style={{color:'#808080',fontSize:20}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.PickerAdd]}
                        onPress={this.add.bind(this)}
                    >
                        <Text style={{color:'#808080',fontSize:20}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}