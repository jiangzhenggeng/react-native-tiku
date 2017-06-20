

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native'

import {RadioGroup,RadioButton} from '../../../Common/RadioButton';

export default class extends Component {
    constructor(props){
        super(props);
    }
    render(){
        var question = this.props.questionDetail;
        var addition = question.addition;

        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
                        {this.showOptionList(addition.option)}
                    </View>
                </View>
            </ScrollView>
        )
    }

    showOptionList(option){
        let returnArray = [],item;
        for (let i in option){
            item = option[i];
            returnArray.push(
                <RadioButton key={i} value={item.optionname} label={item.optionname}>
                    <Text style={{fontSize:16,color:'#808080'}}>{item.optiontext}</Text>
                </RadioButton>
            );
        }
        return (
            <RadioGroup
                onSelect = {(index, value) => alert(index+'='+value)}
            >
                {returnArray}
            </RadioGroup>
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
});
