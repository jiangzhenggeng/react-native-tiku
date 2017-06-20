

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native'

import {DecideGroup,DecideButton} from '../../../Common/RadioButton';

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
                        {this.showOptionList(addition)}
                    </View>
                </View>
                <ShowAnswer ref={o=>this.ShowAnswer=o} {...this.props} {...this.user} />

            </ScrollView>
        )
    }

    showOptionList(addition){
        return (
            <DecideGroup
                onSelect = {this.onSelect.bind(this)}
                selectedValue={this.user.user_answer}
                wrap={this}
            >
                <DecideButton style={{paddingLeft:16,paddingRight:16}} value={1}>
                    <Text style={{fontSize:16,color:'#808080'}}>对</Text>
                </DecideButton>
                <DecideButton style={{paddingLeft:16,paddingRight:16}} value={2}>
                    <Text style={{fontSize:16,color:'#808080'}}>错</Text>
                </DecideButton>
            </DecideGroup>
        );
    }

    onSelect(index, value){
        if(this.disabled) return;
        this.disabled = true;

        var question = this.props.questionDetail;

        global.questionAnswer.forEach((item,index)=>{
            if(item.questionid==question.questionid){
                global.questionAnswer.splice(index,1);
            }
        });

        global.questionAnswer.push({
            'user_answer':value,
            'typeid':question.typeid,
            'questionid':question.questionid,
            'answer':question.answer,
            'uniqueid':question.addition.uniqueid
        });

        if(global.__EXAM__=='EXAM'){
            this.props.root.next.apply(this.props.root);
            return;
        }

        if(question.addition.answer!=value ){
            this.ShowAnswer.show(value,()=>{
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
                    <Text style={[styles.anserText,{color:'#2bc79f'}]}>{addition.answer==1?'对':'错'}</Text>
                    <Text style={[styles.anserText]}>，你的答案是</Text>
                    <Text style={[styles.anserText,{color:istrue?'#2bc79f':'#ff6158'}]}>{this.state.user_answer==1?'对':'错'}</Text>
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
});
