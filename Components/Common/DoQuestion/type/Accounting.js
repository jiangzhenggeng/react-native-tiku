
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

import styles from './accsub/styles';
import RowLine from './accsub/RowLine';
import ShowAnswer from './accsub/ShowAnswer';

export default class extends Component {
    constructor(props){
        super(props);
        this.user = {
            user_answer:'',
            show_answer:false
        };
        this.i = -1;
        
        let question = this.props.questionDetail;
        
        global.questionAnswer.forEach((item,index)=>{
            if( item.questionid == question.questionid){
                this.user.user_answer = item.user_answer;
                this.disabled = true;
                this.user.show_answer = true;
                this.i = index;
            }
        });
        if( this.i == -1 ){
            this.i = global.questionAnswer.length;
            global.questionAnswer.push({
                'typeid':6,
                'questionid':question.questionid,
                'user_answer': [],
            });
        }
        
        if(global.__EXAM__ == 'SHOW_ANSWER'){
            this.user.show_answer = true;
            this.disabled = true;
        }
    }

    setFirst(){

    }
    setSecond(){

    }
    setThird(){

    }
    confirmAnswer(){

    }

    render(){
        var question = this.props.questionDetail;
        var addition = question.addition;

        return (
            <View style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{height:this.scollViewTopHeight}} ref={o=>this.ScrollViewTop=o}>
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
                        <Text style={{color:'#585858',fontSize:16,lineHeight:30}}>{String(question.question).replace(/<[^>]+>/ig,'').replace(/&nbsp;/ig,' ').replace(/&[a-z]{2,6};/ig,'')}</Text>
                    </View>
                    <View style={{padding:16,paddingTop:5,paddingBottom:10}}>
                        <RowLine {...this.props} i={this.i} accounting={addition.accounting} parent={this} />
                    </View>
                    <ShowAnswer ref={o=>this.ShowAnswer=o} {...this.props} {...this.user} />
                </ScrollView>
            </View>
        )
    }
}


