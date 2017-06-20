
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
            show:this.props.show_answer,
            answer:this.props.user_answer
        };
    }
    show(answer,callBack=()=>{}){
        this.setState({
            show:true,
            answer:answer,
        },()=>{
            setTimeout(()=>callBack());
        });
    }
    render() {

        if(!this.state.show)return <View />;

        var question = this.props.questionDetail;
        var addition = question.addition;

        return (
            <View style={styles.showAnswer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.anserText]}>参考答案是</Text>
                </View>
                <View style={{flex:1,flexDirection:'column'}}>
                    {addition.accounting.map((item,index)=>{
                        return (
                            <View key={index} style={{flexDirection:'row', alignItems:'flex-start',flex:1,
                                borderBottomWidth:0.6,
                                borderColor:'#f1f1f1',
                                paddingBottom:10,
                                marginBottom:10,
                            }}>
                                <Text style={[styles.anserText,{color:'#585858'}]}>{index+1}、</Text>
                                <View>
                                    {item.answer.map((item2,index2)=>{
                                        return (
                                            <View key={index+'-'+index2} style={{flexDirection:'row'}}>
                                                <Text style={[styles.anserText,{color:'#2bc79f'}]}>
                                                    {item2.a=1?'借':'贷'}
                                                </Text>
                                                <Text style={[styles.anserText,{color:'#2bc79f',marginLeft:10}]}>
                                                    {item2.accelementsname}
                                                </Text>
                                                <Text style={[styles.anserText,{color:'#2bc79f',marginLeft:10}]}>
                                                    {item2.c}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View>
                    <View>
                        <Text style={[styles.anserText,{color:'#BBBBBB'}]}>解析</Text>
                    </View>
                    <View>
                        <Text style={[styles.anserText]}>{String(addition.analysis).replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
