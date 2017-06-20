

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
    ToastAndroid
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import PageLoading from '../Common/PageLoading';
import UrlConfig from '../Common/Config/UrlConfig';
import SizeConfig from '../Common/Config/SizeConfig';
import HttpRequest from '../Common/HttpRequest';

class OpenChapter  extends Component {

    constructor(props){
        super(props);
        this.state = {
            icon:'ios-add-circle',
            display:'none'
        };
    }
    render(){

        var w = 9;
        var style = {
            left:48,
            top:0,
            right:0,
            backgroundColor:'#f1f1f1',
            height:0.8,
            position:'absolute'
        };

        let item = this.props.item;
        let tempArray = [];
        let btnStyle = {
            alignItems:'center',
            justifyContent:'center',
            height:40,
            width:40,
        };

        if ('child' in this.props.item ){
            for(let sub_index in item.child){
                var sub_item = item.child[sub_index];
                tempArray.push(
                    <View key={sub_index} style={[styles.borderFix, styles.treeItemBox,{height:48,position:'relative'}]}>
                        <View style={{width:20}}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center', position:'relative'}}>
                                <View style={{zIndex:1,width:w,height:w, borderRadius:w/2, backgroundColor:"#1682fb"}}></View>
                                <View style={{zIndex:0,left:9.3,top:0,bottom:0,width:0.6,flex:1,backgroundColor:"#eee",position:'absolute'}}></View>
                            </View>
                        </View>
                        <View style={[{flex: 1, marginLeft: 10}]}>
                            <Text style={[{fontSize: 14, color: '#585858'}]}>{sub_item.chaptername}</Text>
                        </View>
                        <View style={[styles.rightIcon]}>
                            <TouchableOpacity onPress={this._doQuestion.bind(this,sub_item.treeid)} style={btnStyle}>
                                <Icon name="ios-create-outline" size={24} color="#1682fb"/>
                                {/*<Text style={[{fontSize: 12, color: '#1682fb'}]}>{sub_item.number}道</Text>*/}
                            </TouchableOpacity>
                        </View>
                        <View style={style}></View>
                    </View>
                );
            }
        }

        return (
            <View style={[styles.treeItem]}>
                <View style={[styles.borderFix,styles.treeItemBox]}>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={this._openOrClose.bind(this)}>
                        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center',flex:1}}>
                            <Icon name={this.state.icon} size={24} color="#1682fb"/>
                            <View style={[{flex:1,marginLeft:10}]}>
                                <Text style={[{fontSize:14,color:'#585858'}]}>{item.chaptername}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.rightIcon]}>
                        <TouchableOpacity onPress={this._doQuestion.bind(this,item.treeid)} style={btnStyle}>
                            <Icon name="ios-create-outline" size={24} color="#1682fb"/>
                            {/*<Text style={[{fontSize:12,color:'#1682fb'}]}>{item.number}道</Text>*/}
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.display=='flex'?<View>{tempArray}</View>:<View></View>}
            </View>
        );
    }

    _openOrClose(){
        if(this.state.icon=='ios-add-circle'){
            this.setState({
                'icon':'ios-remove-circle',
                'display':'flex'
            });
        }else{
            this.setState({
                'icon':'ios-add-circle',
                'display':'none'
            });
        }
    }

    _doQuestion(treeid){

        let {goBack,state,navigate} = this.props.navigation;

        if(!global.memberid){
            ToastAndroid.show('请先登录',ToastAndroid.SHORT);
            setTimeout(()=>{
                navigate('Common/Login/Login');
            },500);
            return;
        }
        global.__EXAM__ = 'PRACTICE';

        navigate('Common/DoQuestion/DoQuestion',{
            submitUrl:UrlConfig.strongQuestionSave,
            getQuestionUrl:UrlConfig.getStrongQuestionList,
            getQuestionDetail:UrlConfig.getStrongQuestionDetail,
            data:{
                treeid:treeid,
                memberid:global.memberid,
                typeid:state.params.typeid,
            }
        });
    }

}

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            chapterListArray:[],
            count:0
        };
    }
    render(){
        let {goBack,state,navigate} = this.props.navigation;
        let header = (
            <View style={[styles.header,styles.borderFix]}>
                <View style={{width:30}}>
                    <TouchableOpacity onPress={()=>{goBack()}}>
                        <Icon name="ios-arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{state.params.subjectname}</Text>
            </View>
        );
        if(this.state.chapterListArray.length<=0){
            return (
                <View style={styles.container}>
                    {header}
                    <PageLoading />
                </View>
            );
        }

        let subArray = [];
        for (let j in this.state.chapterListArray){
            subArray.push(<OpenChapter {...this.props} key={j} item={this.state.chapterListArray[j]} />);
        }

        return (
            <View style={styles.container}>
                {header}
                <ScrollView style={{backgroundColor:'transparent'}}>
                    <View style={[{flex:1}]}>
                        <View style={[styles.subHeader,styles.borderFix]}>
                            <View style={[{flex:1,paddingTop:15,paddingBottom:10}]}>
                                <Text style={[{color:'#1682fb',marginBottom:5}]}>题海练习</Text>
                                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                                    <Text style={[{color:'#808080',fontSize:12,marginBottom:3}]}>题目总数</Text>
                                    <Text style={[{color:'#1682fb',fontSize:20,marginLeft:10}]}>{this.state.count}</Text>
                                </View>
                                <View style={styles.rightBtnWrap}>
                                    <View style={styles.rightBtnBox}>
                                        <TouchableOpacity>
                                            <Text style={[{color:'#fff',fontSize:18}]}>智能抽题</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.treeList}>{subArray}</View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {

        let {goBack,state,navigate} = this.props.navigation;

        HttpRequest.request(UrlConfig.practice_get_chapter_list,{
            subjectid:state.params.subjectid,
            memberid:global.memberid,
        }).then((replayData)=>{
            if( replayData.code!=0 ){
                goBack();
                ToastAndroid.show(replayData.message || '参数错误',ToastAndroid.SHORT);
                return;
            }

            InteractionManager.runAfterInteractions(() => {
                this.setState({
                    chapterListArray:replayData.data.chapterList,
                    count:replayData.data.count
                });
            });
        });
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
    },
    title:{
        color:'#fff',
        fontSize:18
    },
    borderFix:{
        paddingLeft:16,
        paddingRight:16,
    },
    header:{
        backgroundColor:"#1682fb",
        position:'relative',
        height:SizeConfig.top_tab_bar_height,

        alignItems:'center',
        flexDirection:"row",
        justifyContent:"flex-start",

    },
    subHeader:{
        backgroundColor:"#ffffff",
        position:'relative',
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
        marginTop:5,
    },
    rightBtnWrap:{
        position:'absolute',
        right:0,
        top:0,
        bottom:0,
        justifyContent:'center',
    },
    rightBtnBox:{
        height:40,
        width:100,
        backgroundColor:'#808080',
        alignItems:'center',
        justifyContent:'center',
    },

    treeList:{
        flex:1,
    },
    treeItem:{
        backgroundColor:"#ffffff",
        paddingTop:5,
        paddingBottom:5,
        marginBottom:3,
        borderColor:'#f1f1f1',
        borderBottomWidth:0.5,
    },
    treeItemBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    rightIcon:{
        justifyContent:'center',
        alignItems:'center',
    },
});
