

import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Dimensions,
    InteractionManager,
    ToastAndroid,
    StatusBar
} from 'react-native'
import Styles from '../Config/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from "../../Common/Loading";
import ImmutableCompare from "../../Common/ImmutableCompare";
import PageLoading from '../../Common/PageLoading';
import GetQuestionType from '../../Common/GetQuestionType';
import HttpRequest from '../../Common/HttpRequest';
import { NavigationActions } from 'react-navigation';

export default class QuestionView extends Component {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }
        this.state = {
            visible:false,
            questionListArray:[],
        };
    }

    render(){
        let sta = <StatusBar backgroundColor={'#1682fb'}/>;
        if(this.state.questionListArray.length<=0){
            return (
                <Modal
                    ref={o=>this.Modal=o}
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={this.closeSheet.bind(this)}
                >
                    <PageLoading />
                    {sta}
                </Modal>
            );
        }

        return (
            <Modal
                ref={o=>this.Modal=o}
                animationType={"slide"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.closeSheet.bind(this)}
            >
                {sta}
                <Loading ref={loading => this.loading = loading } />
                <View style={{flex:1, backgroundColor:'#fff'}}>
                    <View style={styles.header}>
                        <View style={{width:40,height:40}}>
                            <TouchableOpacity onPress={this.closeSheet.bind(this)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Icon name="ios-close" size={40} color="#585858"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>已做{global.questionAnswer.length}道/总{this.state.questionListArray.length}道</Text>
                        </View>
                        {global.__EXAM__ == 'SHOW_ANSWER'?
                            <View></View>:
                            <View style={styles.submitQuestionBtn}>
                                <TouchableOpacity onPress={this.saveRecord.bind(this)} style={Styles.TouchableOpacityBtn}>
                                    <Text style={{color:'#fff',fontSize:16}}>交卷</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <View style={{flex:1,marginTop:16}}>
                        <ScrollView style={{backgroundColor:'transparent'}}>
                            {this.listSheetCard()}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
    openSheet(parentState){
        if(parentState.questionListArray.length>0){
            this.setState({
                visible:true,
            });
            InteractionManager.runAfterInteractions(()=>{
                this.setState({
                    questionListArray:parentState.questionListArray,
                    init:true
                });
            });
        }else{
            ToastAndroid.show('没有试题', ToastAndroid.LONG);
        }
    }

    closeSheet(){
        this.setState({
            visible:false
        });
    }

    listSheetCard(){

        let tempBtn = [],mapArray = this.state.questionListArray,k,wrap=[];
        for (var i in mapArray){
            k = i;
            let styleBtn = {},
                styleBtnText = {};

            if (global.questionAnswer.length){
                for (let index2 in global.questionAnswer){
                    if( global.questionAnswer[index2].questionid==mapArray[i].questionid){

                        if( global.questionAnswer[index2].optionid && mapArray[i].optionid){

                            if(global.questionAnswer[index2].optionid == mapArray[i].optionid){
                                styleBtn.backgroundColor = '#1682fb';
                                styleBtn.borderColor = '#1682fb';
                                styleBtnText.color = '#fff';
                            }
                        }else{
                            styleBtn.backgroundColor = '#1682fb';
                            styleBtn.borderColor = '#1682fb';
                            styleBtnText.color = '#fff';
                        }
                    }
                }
            }

            if( global.questionCurrIndex==i ){
                styleBtn.backgroundColor = '#FF9900';
                styleBtn.borderColor = '#FF9900';
                styleBtnText.color = '#fff';
            }

            tempBtn.push(
                <View key={i} style={[styles.sheetBtn,styleBtn]}>
                    <TouchableOpacity onPress={this.pressSheetBtn.bind(this,i)} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={[styles.sheetBtnText,styleBtnText]}>{parseInt(i)+1}</Text>
                    </TouchableOpacity>
                </View>
            );

            if(typeof mapArray[++k]!='undefined' && mapArray[i].typeid!=mapArray[k].typeid){
                wrap.push({component:tempBtn,typeid:mapArray[i].typeid});
                tempBtn = [];
            }
        }
        if(tempBtn.length>0){
            wrap.push({component:tempBtn,typeid:mapArray[i].typeid});
            tempBtn = [];
        }

        for (let i in wrap){
            tempBtn.push(
                <View key={i} style={{}}>
                    <View style={styles.fix}><Text>{GetQuestionType(wrap[i].typeid).name}</Text></View>
                    <View style={styles.sheetBtnWrap}>{wrap[i].component}</View>
                </View>
            );
        }
        return tempBtn;
    }
    pressSheetBtn(index){
        this.closeSheet();
        this.props.parent.directionalToQuestion(index);
    }

    saveRecord(){
        if(!global.doQuestion_config.submitUrl){
            ToastAndroid.show('提交地址错误', ToastAndroid.LONG);
            return;
        }

        if(!global.questionAnswer.length){
            ToastAndroid.show('请先做题', ToastAndroid.LONG);
            return;
        }
        let {navigate,goBack,state} = this.props.navigation;
        this.loading.open();
        HttpRequest.request(global.doQuestion_config.submitUrl,{
            ...state.params.data,
            answer:global.questionAnswer,
            type:global.questionType,
            memberid:global.memberid,
            //练习记录专属id
            practiceid:global.practiceid,
        }).then((replayData)=>{
            this.loading.close();
            if(replayData.code==0){
                this.closeSheet();
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Common/DoQuestion/ShowAnswerResult',
                    params: {
                        ...this.props,
                        ...state.params,
                        'result':replayData.data,
                    },
                });
                this.props.navigation.dispatch(navigateAction);
            }else{
                ToastAndroid.show(replayData.message || '提交失败', ToastAndroid.LONG);
            }
        },()=>{

        });
    }

}

const {width} = Dimensions.get('window');
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
    sheetBtnWrap:{
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap:'wrap',
        padding:8,
    },
    sheetBtn:{
        height:(width-16 -2)/5 - 16,
        width:(width-16 -2)/5 - 16,
        borderRadius:3,
        borderColor:'#e6e6e6',
        borderWidth:1,
        margin:8,
    },
    sheetBtnText:{
        fontSize:16,
        color:'#585858',
    },

    submitQuestionBtn:{
        backgroundColor:'#1682fb',
        height:35,
        width:80,
    },
});
