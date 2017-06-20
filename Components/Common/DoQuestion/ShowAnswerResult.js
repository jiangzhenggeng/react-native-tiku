

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    ToastAndroid,
    BackHandler
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import ImmutableCompare from "../../Common/ImmutableCompare";
import PageLoading from '../../Common/PageLoading';
import UnitToll from '../UnitTool';
import Styles from '../Config/Styles';
import { NavigationActions } from 'react-navigation';

export default class ShowAnswerResult extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        let {navigate,goBack,state} = this.props.navigation;

        let result = UnitToll.toArray(state.params.result);

        if(result.length>0){
            this.state = {
                visible:true,
                resultListArray:result,
            };
        }else{
            ToastAndroid.show('没有试题提交', ToastAndroid.LONG);
        }
        this.key = !this.props.navigation.state.params.navigation ||
            this.props.navigation.state.params.navigation.state.key ||
            this.props.routeKey || null;

    }

    render(){
        if(this.state.resultListArray.length<=0){
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <PageLoading />
                </View>
            );
        }

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.header}>
                    <View style={{width:40,height:40}}>
                        <TouchableOpacity onPress={this.close.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Icon name="ios-close" size={40} color="#585858"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>评分结果</Text>
                    </View>
                </View>
                <View style={{flex:1,marginTop:16}}>
                    <ScrollView style={{backgroundColor:'transparent'}}>
                        <View style={{alignItems:'center',justifyContent:'center',height:40,}}>
                            <Text style={[styles.resultTitle]}>评分结果</Text>
                        </View>
                        <View style={{padding:16}}>
                            {this.state.resultListArray.map((item,index)=>{
                                return (
                                    <View key={index} style={styles.itemWrap}>
                                        <View style={[styles.cell1]}>
                                            <Text style={[styles.text,styles.type]}>{item.typename}</Text>
                                        </View>
                                        <View style={[styles.cell2]}>
                                            <Text style={[styles.text]}>做对：<Text style={[styles.true]}>{item.truenumber}</Text></Text>
                                            <Text style={[styles.text]}>做错：<Text style={[styles.false]}>{item.falsenumber}</Text></Text>
                                            <Text style={[styles.text]}>总计：{item.totalnumber}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={[styles.submitQuestionBtn]}>
                            <TouchableOpacity onPress={this.showAnswer.bind(this)} style={Styles.TouchableOpacityBtn}>
                                <Text style={{color:'#fff',fontSize:16}}>查看解析</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    close(){
        this.props.navigation.goBack(this.key);
    }
    componentDidMount() {
        this.backPressHandle = BackHandler.addEventListener('backPress', ()=>{
            this.close();
            return true;
        });
    }
    componentWillUnmount() {
        this.backPressHandle && this.backPressHandle.remove();
    }

    showAnswer(){
        let {navigate,state} = this.props.navigation;
        global.__EXAM__ = 'SHOW_ANSWER';
        navigate('Common/DoQuestion/DoQuestionShowAnswer',{
            ...this.props,
            ...state.params,
            routeKey:this.key
        });
    }
}

const styles = StyleSheet.create({
    fix:{
        paddingLeft:16,
        paddingRight:16,
    },
    header:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    resultTitle:{
        fontSize:18,
        color:'#333',
        textAlign:'center',
    },
    itemWrap:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:50,
        marginBottom:10,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    cell1:{
        width:100,
        borderColor:'#f1f1f1',
        borderRightWidth:0.5,
    },
    cell2:{
        flex:1,
        marginLeft:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },

    text:{
        fontSize:16,
        color:'#808080',
    },
    type:{
        color:'#585858',
    },
    true:{
        color:'#1682fb',
    },
    false:{
        color:'#fe5341',
    },

    submitQuestionBtn:{
        backgroundColor:'#1682fb',
        height:45,
        margin:16,
        marginTop:20,
        marginBottom:20,
    },
});
