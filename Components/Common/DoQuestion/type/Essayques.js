

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Styles from '../../Config/Styles';

let confirm = false;

export default class extends Component {
    constructor(props){
        super(props);

        this.user = {
            user_answer:'',
            show_answer:false
        };

        this.disabled = false;

        var question = this.props.questionDetail;

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                this.user.user_answer = item.user_answer;
                if(global.__EXAM__!='EXAM'){
                    this.user.show_answer = true;
                }
                this.disabled = true;
            }
        });

        if(global.__EXAM__ == 'SHOW_ANSWER'){
            this.user.show_answer = true;
            this.disabled = true;
        }

    }
    render(){
        var question = this.props.questionDetail;
        if(!confirm){
            this.disabled = false;
            this.user.show_answer = false;
        }
        return (
            <ScrollView ref="ScrollView" showsVerticalScrollIndicator={false} style={styles.container}>
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
                        <Text style={{color:'#585858',fontSize:16,lineHeight:30}}>{String(question.question).replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        {this.showOptionList()}
                        <View ref="confirmAnswerBtn" style={[styles.submitQuestionBtn,{display:this.disabled?'none':'flex'}]}>
                            <TouchableOpacity onPress={this.submitAnswer.bind(this)} style={Styles.TouchableOpacityBtn}>
                                <Text style={{color:'#fff',fontSize:16}}>我已做完该题</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ShowAnswer ref={o=>this.ShowAnswer=o} {...this.props} {...this.user} />

            </ScrollView>
        )
    }

    showOptionList(){
        return (
            <View style={styles.blankTextInputWrap}>
                <View style={styles.blankTextInputBox}>
                    <TextInput
                        style={styles.blankTextInput}
                        onChangeText={ text => {
                            this.TextInputValue = text;
                            this.setAnswer();
                        } }
                        placeholder= "填写你的答案"
                        placeholderTextColor="#bbb"
                        clearButtonMode="while-editing"
                        underlineColorAndroid='transparent'
                        selectionColor="#ffffff"
                        enablesReturnKeyAutomatically={true}
                        multiline={true}
                        editable={!this.disabled}
                        defaultValue={this.user.user_answer}
                        textAlignVertical="top"
                        ref="TextInput"
                    />
                </View>
            </View>
        );
    }

    setAnswer(){
        if(this.disabled) return;

        var question = this.props.questionDetail;
        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                global.questionAnswer.splice(index,1);
            }
        });
        global.questionAnswer.push({
            'user_answer':this.TextInputValue,
            'typeid':question.typeid,
            'questionid':question.questionid,
            'answer':question.addition.answer,
            'uniqueid':question.addition.uniqueid
        });
    }

    submitAnswer( ){
        if(this.disabled) return;
        if(!this.TextInputValue){
            ToastAndroid.show('请先填写答案',ToastAndroid.LONG);
            return;
        }

        this.disabled = true;
        confirm = true;

        var question = this.props.questionDetail;

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                global.questionAnswer.splice(index,1);
            }
        });

        global.questionAnswer.push({
            'user_answer':this.TextInputValue,
            'typeid':question.typeid,
            'questionid':question.questionid,
            'answer':question.addition.answer,
            'uniqueid':question.addition.uniqueid
        });

        this.refs['TextInput'].setNativeProps({
            editable:false
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
                <View style={{}}>
                    <Text style={[styles.anserText]}>参考答案：</Text>
                    <Text style={[styles.anserText,]}>{addition.answer.replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
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
        borderWidth:0.8,
        height:120,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:3,
    },
    blankTextInput:{
        color:'#585858',
        fontSize:16,
        flex:1,
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
