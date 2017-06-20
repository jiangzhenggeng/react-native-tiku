

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import Styles from '../../Config/Styles';

export default class extends Component {
    constructor(props){
        super(props);
        this.question = this.props.questionDetail;
        this.addition = this.question.addition;

        this.user = {
            user_answer:'',
            show_answer:false
        };
        this.TextInputValue = {};

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==this.question.questionid){
                this.TextInputValue[item.uniqueid] = item.user_answer;
                this.disabled = true;
                this.user.show_answer = true;
            }
        });
        this.user.user_answer = this.TextInputValue;

        if(global.__EXAM__ == 'SHOW_ANSWER'){
            this.user.show_answer = true;
            this.disabled = true;
        }
    }
    render(){

        return (
            <ScrollView ref="ScrollView" showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={[{color:'#444',fontSize:16}]}>{this.props.typename}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#8687fb', fontSize:24}}>{this.props.index}</Text>
                        <Text style={{color:'#585858', fontSize:16,top:3}}>/{this.props.count}</Text>
                    </View>
                </View>
                <View style={{padding:16,paddingTop:5,paddingBottom:10}}>
                    <View>
                        <Text style={{color:'#585858',fontSize:16,lineHeight:30}}>{String(this.question.question).replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        {this.showOptionList(this.addition.answer)}
                        <View ref="confirmAnswerBtn" style={[styles.submitQuestionBtn,{display:this.disabled?'none':'flex'}]}>
                            <TouchableOpacity onPress={this.confirmAnswer.bind(this)} style={Styles.TouchableOpacityBtn}>
                                <Text style={{color:'#fff',fontSize:16}}>我已做完该题</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ShowAnswer ref={o=>this.ShowAnswer=o} {...this.props} {...this.user} />

            </ScrollView>
        )
    }

    showOptionList(option){
        let returnArray = [],item;
        this.refsTextInput = [];
        for (let i in option){
            item = option[i];
            returnArray.push(
                <View key={i} style={styles.blankTextInputWrap}>
                    <View style={{width:60}}><Text style={{color:'#585858',fontSize:16}}>填空{++i}：</Text></View>
                    <View style={styles.blankTextInputBox}>
                        <TextInput
                            style={styles.blankTextInput}
                            onChangeText={ (function (item,_self) {
                                return (text) =>{
                                    _self.TextInputValue[item.uniqueid] = text;
                                    _self.setAnswer( item.uniqueid );
                                };
                            })(item,this) }
                            defaultValue={this.TextInputValue[item.uniqueid]||''}
                            placeholder= {"填空"+i}
                            placeholderTextColor="#bbb"
                            clearButtonMode="while-editing"
                            underlineColorAndroid='transparent'
                            selectionColor="#ffffff"
                            enablesReturnKeyAutomatically={true}
                            keyboardType="numeric"
                            editable={!this.disabled}
                            ref={o=>this.refsTextInput.push(o)}
                        />
                    </View>
                </View>
            );
        }
        return returnArray;
    }

    setAnswer( uniqueid ){
        if(this.disabled) return;

        var question = this.props.questionDetail,
            index_pos = [];

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                index_pos.push(index);
            }
        });
        index_pos.sort(function(a,b){
            return a<b;
        });

        index_pos.forEach((index)=>{
            global.questionAnswer.splice(index,1);
        });

        for(let uniqueid in this.TextInputValue){
            global.questionAnswer.push({
                'user_answer':this.TextInputValue[uniqueid],
                'typeid':question.typeid,
                'questionid':question.questionid,
                'uniqueid':uniqueid
            });
        }
    }

    confirmAnswer(){
        if(this.disabled) return;

        if(this.TextInputValue.length<3){
            ToastAndroid.show('请先填写答案',ToastAndroid.LONG);
            return ;
        }

        this.disabled = true;

        var question = this.props.questionDetail,
            index_pos = [];

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                index_pos.push(index);
            }
        });
        index_pos.sort(function(a,b){
            return a<b;
        });
        index_pos.forEach((index)=>{
            global.questionAnswer.splice(index,1);
        });

        for(var uniqueid in this.TextInputValue){
            global.questionAnswer.push({
                'user_answer':this.TextInputValue[uniqueid],
                'typeid':question.typeid,
                'questionid':question.questionid,
                'uniqueid':uniqueid
            });
        }

        this.refsTextInput.forEach((item,index)=>{
            item.setNativeProps({
                editable:false
            });
        });

        this.refs['confirmAnswerBtn'].setNativeProps({
            style:{
                display:'none'
            }
        });

        if(global.__EXAM__=='EXAM'){
            this.props.root.next.apply(this.props.root);
            return;
        }

        this.ShowAnswer.show( this.TextInputValue,()=>{
            this.refs['ScrollView'].scrollToEnd();
        } );

    }

}


class ShowAnswer extends Component {

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
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.anserText,{color:'#2bc79f'}]}>
                        {addition.answer.map((item,index)=>{
                            return ++index+'、'+item.answer+'，'
                        })}
                    </Text>
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


const styles = StyleSheet.create({
    header:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:50,
        paddingLeft:16,
        paddingRight:16,
        borderBottomWidth:0.8,
        borderColor:'#e9e9e9',
    },
    blankTextInputWrap:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
    },
    blankTextInputBox:{
        flex:1,
        borderColor:'#e6e6e6',
        borderWidth:0.5,
        height:42,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:3,
    },
    blankTextInput:{
        color:'#585858',
        fontSize:16,
    },
    submitQuestionBtn:{
        backgroundColor:'#1682fb',
        height:45,
        marginTop:20,
        marginBottom:20,
    },

    showAnswer:{
        borderTopWidth:0.5,
        borderColor:'#f1f1f1',
        padding:16,
        paddingTop:5,
        paddingBottom:10
    },
    anserText:{
        color:'#585858',
        fontSize:16,
        lineHeight:30
    },
});
