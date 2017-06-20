

import React, { Component } from 'react'
import {
    Text,
    View,
    Animated,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    BackAndroid,
    InteractionManager,
    LayoutAnimation,
    ViewPagerAndroid,
    ToastAndroid,
    BackHandler
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Popup from '../../Common/Popup';
import Loading from '../../Common/Loading';
import PageLoading from '../../Common/PageLoading';
import HttpRequest from '../../Common/HttpRequest';
import ImmutableCompare from "../../Common/ImmutableCompare";
import UrlConfig from '../Config/UrlConfig';
import ShowQuestion from '../DoQuestion/ShowQuestion';
import QuestionSheet from '../DoQuestion/QuestionSheet';
import FeedBackQuestion from '../DoQuestion/FeedBackQuestion';
import HeaderQuery from './HeaderQuery';
import styles from './DoQuestion.style';

export default class extends Component {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = (nextProps,nextState) => {
            return ImmutableCompare.apply(this,arguments);
        }

        this.state = {
            questionListArray:[],
            count:0,
            init:false,
        };
        this.ShowQuestion = [];
        this.questionid = null;

        this.o = null;
        this.index = 0;
        let {state} = this.props.navigation;
        global.doQuestion_config = {
            submitUrl:state.params.submitUrl,
        }
    }

    render(){

        let headerView = (
            <View style={[styles.header,styles.borderFix]}>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={this.handleBack.bind(this)}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={()=>{ this.QuestionSheet && this.QuestionSheet.openSheet(this.state)}}>
                        <Icon name="ios-keypad-outline" size={26} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={this.QuestionCollection.bind(this)}>
                        <HeaderQuery ref={o=>this.HeaderQuery=o} {...this.props} />
                    </TouchableOpacity>
                </View>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={()=>{ this.FeedBackQuestion && this.FeedBackQuestion.openFeedBack(this)}}>
                        <Icon name="ios-alert-outline" size={26} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        );
        if(!this.state.init){
            return (
                <View style={styles.container}>
                    {headerView}
                    <PageLoading />
                    <Popup ref={popup => this.popup = popup } />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {headerView}
                <Popup ref={popup => this.popup = popup } />
                <Loading ref={loading => this.loading = loading } />
                <View style={{flex:1}}>
                    <ViewPagerAndroid
                        style={{flex:1}}
                        onPageSelected={this.onPageSelected.bind(this)}
                        ref={o=>this.ViewPagerAndroid=o}
                    >
                        {this.questionListShow()}
                    </ViewPagerAndroid>
                </View>
                {/*答题卡*/}
                <QuestionSheet {...this.props} routeKey={this.props.navigation.state.key} ref={o=>this.QuestionSheet=o} parent={this} />
                {/*试题反馈*/}
                <FeedBackQuestion {...this.props} ref={o=>this.FeedBackQuestion=o} parent={this} />
            </View>
        )
    }

    componentDidMount() {
        if(!global.memberid){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            this.props.navigation.goBack();
            return;
        }
        const { params } = this.props.navigation.state;

        HttpRequest.request(
            params.getQuestionUrl,
            params.data || {},
        ).then((replayData)=>{
            if(replayData.code!=0){
                ToastAndroid.show(replayData.message,ToastAndroid.LONG);
                this.props.navigation.goBack();
                return;
            }
            let length = replayData.data.question.length,
                count = replayData.data.count;
            count = length>count?length:count;

            if(count<=0){
                ToastAndroid.show('没有试题',ToastAndroid.LONG);
                this.props.navigation.goBack();
            }
            global.questionAnswer = [];

            if( replayData.data.user_answer ){
                global.questionAnswer = replayData.data.user_answer;
            }

            this.setState({
                questionListArray:replayData.data.question,
                init:true,
                count:count
            },()=>{
                if(replayData.data.practiceid){
                    global.practiceid = replayData.data.practiceid;
                }
                //获取试题
                if(count>0){
                    this.goToIndexQuestion(0);
                }
            });
        });

        this.backPressHandle = BackHandler.addEventListener('backPress', ()=>{
            this.handleBack();
            return true;
        });
    }
    componentWillUnmount() {
        global.doQuestion_config = {};
        global.questionCurrIndex = 0;
        this.backPressHandle && this.backPressHandle.remove();
    }

    openPopup = false;
    handleBack( ){

        let {goBack,state} = this.props.navigation;
        if( !global.doQuestion_config.submitUrl ){
            goBack();
            return;
        }

        if( this.state.questionListArray.length<=0 ){
            goBack();
            return;
        }

        if(global.__EXAM__ == 'SHOW_ANSWER'){
            goBack();
        }else{
            if(this.openPopup){
                this.popup.close();
                this.openPopup = false;
                return;
            }
            this.openPopup = true;

            this.popup.confirm({
                title: '你确定退出吗？',
                content: null,
                ok: {
                    text: '退出并保存',
                    style: {
                        color: '#1682fb'
                    },
                    callback: () => {
                        this.openPopup = false;
                        if(!global.questionAnswer.length){
                            goBack();
                            return;
                        }

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
                                ToastAndroid.show('答案保存成功',ToastAndroid.SHORT);;
                            }

                            global.practiceid = null;
                            global.questionAnswer = [];
                            goBack();

                        },(error)=>{
                            global.practiceid = null;
                            global.questionAnswer = [];
                            goBack();
                        });
                    },
                },
                cancel: {
                    text: '关闭',
                    style: {
                        color: '#888'
                    },
                    callback:()=>{
                        this.openPopup = false;
                    }
                },
            });
        }
        return true;
    }

    questionListShow(){
        let listArray = [],
            temp = [];
        global.questionType = {};
        for (let i in this.state.questionListArray){
            temp = this.state.questionListArray[i];
            listArray.push(
                <View key={i} style={{flex:1}}>
                    <ShowQuestion
                        index={++i}
                        ref={o=>this.ShowQuestion.push(o)}
                        count={this.state.count}
                        {...temp}
                        root={this}
                        {...this.props}
                    />
                </View>
            );

            if(global.questionType['type'+temp.typeid]){
                global.questionType['type'+temp.typeid].num ++ ;
            }else{
                global.questionType['type'+temp.typeid] = {
                    typeid:temp.typeid,
                    num:1
                };
            }
        }
        return listArray;
    }

    prev(){
        this.directionalToQuestion(this.index-1);
    }
    next(){
        this.directionalToQuestion(this.index+1);
    }

    onPageSelected(event){
        this.goToIndexQuestion( event.nativeEvent.position );
    }

    goToIndexQuestion(index){

        this.index = index;

        global.questionCurrIndex = index;

        this.ShowQuestion[index].getQuestionDetail(o=>{
            this.HeaderQuery.update( o.collection );
            this.questionid = o.props.questionid;
            this.o = o;
            global.questionid = o.props.questionid;
        });

        var max = index,min = 0;
        for(var i = 1 ; i <= 2 ; i++ ){
            if( this.ShowQuestion[index + i] ){
                this.ShowQuestion[index + i].getQuestionDetail();
                max = index + i;
            }
            if( this.ShowQuestion[index - i] ){
                this.ShowQuestion[index - i].getQuestionDetail();
                min = index - i;
            }
        }
        this.ShowQuestion.forEach((item,index)=>{
            if( (index<min || index > max) ){
                if(this.ShowQuestion[index])
                    this.ShowQuestion[index].hide();
            }
        });
    }

    directionalToQuestion(index){
        if(typeof index!='number'){
            index = parseInt(index);
        }
        if( this.ShowQuestion[index] ){
            this.ViewPagerAndroid.setPage(index);
            this.goToIndexQuestion(index);
        }else{
            if(index>0){
                ToastAndroid.show('已是最后一题啦~',ToastAndroid.SHORT);
            }else if(index==0){
                ToastAndroid.show('已是第一题啦~',ToastAndroid.SHORT);
            }
        }
    }

    //收藏试题
    QuestionCollection(){
        let memberid = global.loginState?global.loginState.memberid:0;
        let {navigate} = this.props.navigation;
        if(memberid<=0){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            navigate('Common/Login/Login');
            return;
        }
        if(!this.questionid){
            return;
        }
        HttpRequest.request(UrlConfig.question_collection,{
            questionid:this.questionid,
            memberid:memberid
        }).then((replayData)=>{
            InteractionManager.runAfterInteractions(() => {
                if(replayData.code==0){
                    if(replayData.data.collection==1){
                        this.HeaderQuery.update(1);
                        this.o.collection = 1;
                        ToastAndroid.show('收藏成功',ToastAndroid.SHORT);
                    }else{
                        this.HeaderQuery.update(0);
                        this.o.collection = 0;
                        ToastAndroid.show('取消收藏',ToastAndroid.SHORT);
                    }
                }else{
                    ToastAndroid.show(replayData.message,ToastAndroid.SHORT);
                }
            });
        });
    }

}

