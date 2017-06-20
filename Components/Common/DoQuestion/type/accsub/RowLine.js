
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
import CellLine from './CellLine';

var randomId = ()=>{
    return 'ID'+String(Math.random()).replace('.','')+( ~ new Date());
};

export default class extends Component {

    constructor(props){

        super(props);
        let id = randomId();
        let data = {
            __uniqueid__: id,
            __row_answer__:[]
        };
        this.state = {
            accNumber:[data],
        };
        this.confirmAnswer = this.props.parent.confirmAnswer;
        this.i = this.props.i;
        global.questionAnswer[this.i].user_answer.push( data );
    }
    render() {
        return (
            <View style={{marginBottom:20}}>
                <View style={styles.accWrap}>
                    {this.state.accNumber.map( (item,index)=>
                        <CellLine {...this.props} accNumber={this.state.accNumber[index]} key={index} index={index+1} />
                    )}
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{height:45, width:80, marginRight:5, borderColor:'#e6e6e6', borderWidth:0.5, justifyContent:'center', alignItems:'center',}} onPress={this.sub.bind(this)}>
                        <Text style={{color:'#808080',fontSize:20}}>-</Text>
                    </TouchableOpacity>
                    <View style={[styles.submitQuestionBtn,{marginRight:5}]}>
                        <TouchableOpacity onPress={this.confirmAnswer} style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={{color:'#fff',fontSize:16}}>确认该题</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitQuestionBtn}>
                        <TouchableOpacity onPress={this.add.bind(this)} style={{justifyContent:'center',alignItems:'center',flex:1}}>
                            <Text style={{color:'#fff',fontSize:16}}>增加分录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    sub(){
        this.state.accNumber.pop();
        this.setState({
            accNumber:this.state.accNumber
        },()=>{
            global.questionAnswer[this.i].user_answer.pop();
        });
    }
    add(){
        let id = randomId(),
            add = {
                __uniqueid__: id,
                __row_answer__:[]
            };
        this.state.accNumber.push( add );

        this.setState({
            accNumber:this.state.accNumber
        },()=>{
            setTimeout(()=>{
                this.props.parent && this.props.parent.ScrollViewTop.scrollToEnd();
            });
        });
        global.questionAnswer[this.i].user_answer.push( add );

    }
}