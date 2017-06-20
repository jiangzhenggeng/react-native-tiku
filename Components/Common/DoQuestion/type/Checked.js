

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'

import {
    CheckboxGroup,
    CheckboxButton
} from '../../../Common/RadioButton';
import Styles from '../../Config/Styles';

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
                let user_answer = item.user_answer;
                if(question.addition.answer!=user_answer){
                    if(global.__EXAM__!='EXAM'){
                        this.user.show_answer = true;
                    }
                }
                this.user.user_answer = user_answer;
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
        var addition = question.addition;

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
                <View style={{paddingTop:5,paddingBottom:10}}>
                    <View style={{paddingLeft:16,paddingRight:16}}>
                        <Text style={{color:'#585858',fontSize:16,lineHeight:30}}>{String(question.question).replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        {this.showOptionList(addition.option)}
                    </View>
                    <View ref="confirmAnswerBtn" style={[styles.submitQuestionBtn,{margin:16,display:this.disabled?'none':'flex'}]}>
                        <TouchableOpacity onPress={this.confirmAnswer.bind(this)} style={Styles.TouchableOpacityBtn}>
                            <Text style={{color:'#fff',fontSize:16}}>确认答案</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ShowAnswer ref={o=>this.ShowAnswer=o} {...this.props} {...this.user} />
            </ScrollView>
        )
    }

    showOptionList(option){
        let returnArray = [],item;
        for (let i in option){
            item = option[i];
            returnArray.push(
                <CheckboxButton style={{paddingLeft:16,paddingRight:16}} key={i} value={item.optionname} label={item.optionname}>
                    <Text style={{fontSize:16,color:'#808080'}}>{item.optiontext}</Text>
                </CheckboxButton>
            );
        }
        return (
            <CheckboxGroup
                onSelect = {this.onSelect.bind(this)}
                selectedValue={this.user.user_answer}
                ref={o=>this._CheckboxGroup=o}
                disabled={this.disabled}
            >
                {returnArray}
            </CheckboxGroup>
        );
    }

    onSelect( value ){
        if(this.disabled) return;
        this.value = value.sort().join('');
    }

    confirmAnswer(){
        if(this.disabled) return;

        if(!this.value){
            ToastAndroid.show('请选择答案',ToastAndroid.LONG);
            return;
        }

        this.disabled = true;

        var question = this.props.questionDetail;

        this.user.user_answer = this.value;

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                global.questionAnswer.splice(index,1);
            }
        });

        global.questionAnswer.push({
            'user_answer':this.value,
            'typeid':question.typeid,
            'questionid':question.questionid,
            'answer':question.addition.answer,
            'uniqueid':question.addition.uniqueid
        });

        this._CheckboxGroup.setDisabled();

        this.refs['confirmAnswerBtn'].setNativeProps({
            style:{
                display:'none'
            }
        });

        if(global.__EXAM__=='EXAM'){
            this.props.root.next.apply(this.props.root);
            return;
        }

        if(question.addition.answer!=this.user.user_answer){
            this.ShowAnswer.show( this.user.user_answer ,()=>{
                this.refs['ScrollView'].scrollToEnd();
            });
        }else{
            this.props.root.next.apply(this.props.root);
        }
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
        let istrue = this.state.answer==addition.answer;

        return (
            <View style={styles.showAnswer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.anserText]}>参考答案是</Text>
                    <Text style={[styles.anserText,{color:'#2bc79f'}]}>{addition.answer}</Text>
                    <Text style={[styles.anserText]}>，你的答案是</Text>
                    <Text style={[styles.anserText,{color:istrue?'#2bc79f':'#ff6158'}]}>{this.state.answer}</Text>
                    {
                        istrue?<Text style={[styles.anserText]}>，回答正确。</Text>
                            :<Text style={[styles.anserText]}>，回答错误。</Text>
                    }
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

    submitQuestionBtn:{
        backgroundColor:'#1682fb',
        height:45,
        marginTop:20,
        marginBottom:20,
    },
});
